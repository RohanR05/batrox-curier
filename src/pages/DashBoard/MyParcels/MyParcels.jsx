import React, { useEffect, useRef } from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { TbListDetailsFilled } from "react-icons/tb";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit, FaGift } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading/Loading";
import { useSearchParams } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const [searchParams, setSearchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const paymentProcessed = useRef(false); // Prevents React 18 StrictMode double-execution

  // Fetch list of parcels for current user
  const {
    isLoading,
    data: parcels = [],
    refetch,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  // Handle successful Stripe return redirect
  useEffect(() => {
    if (sessionId && !paymentProcessed.current) {
      paymentProcessed.current = true;

      axiosSecure
        .patch(`/payment-success?session_id=${sessionId}`)
        .then((res) => {
          if (res.data?.success || res.data?.modifiedCount > 0) {
            Swal.fire({
              icon: "success",
              title: "Payment Successful!",
              text: "Your parcel payment status has been updated.",
              timer: 2500,
              showConfirmButton: false,
            });
            // 1. Refresh table data
            refetch();
            // 2. Clean up URL parameter so it doesn't run again on page reload
            searchParams.delete("session_id");
            setSearchParams(searchParams);
          }
        })
        .catch((err) => {
          console.error("Payment update failed:", err);
        });
    }
  }, [sessionId, axiosSecure, refetch, searchParams, setSearchParams]);

  // Handle Stripe Payment initiation directly for a specific parcel
  const handlePayment = async (selectedParcel) => {
    if (!selectedParcel) return;

    try {
      const paymentInfo = {
        cost: selectedParcel.cost,
        parcelId: selectedParcel._id,
        senderEmail: selectedParcel.senderEmail || user?.email,
        parcelTitle: selectedParcel.parcelTitle,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );

      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment redirect failed:", error);
      Swal.fire({
        icon: "error",
        title: "Payment Error",
        text: "Could not initiate payment session. Please try again.",
      });
    }
  };

  const handleMyParcelsDelete = (id) => {
    Swal.fire({
      title: "Are you sure?",
      text: "You won't be able to revert this!",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, delete it!",
    }).then((result) => {
      if (result.isConfirmed) {
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
      }
    });
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-primary p-4 md:p-6 rounded-2xl shadow-sm border border-secondary">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-base-content">
            <FaGift className="text-secondary" />
            My Parcels Info
          </h2>
          <p className="text-sm text-base-content/70 mt-1">
            Pay and manage all your parcel delivery
          </p>
        </div>
        <div className="stat text-secondary bg-secondary rounded-xl w-auto py-2 px-6">
          <div className="stat-title font-semibold text-primary">
            Total Transactions
          </div>
          <div className=" text-white stat-value text-2xl">
            {parcels.length}
          </div>
        </div>
      </div>
      {/* table */}

      {parcels.length === 0 ? (
        <div className="text-center py-12 px-4">
          <FaGift className="mx-auto text-4xl text-base-content/30 mb-3" />
          <h3 className="text-lg font-semibold text-base-content/70">
            No Parcels Records Found
          </h3>
          <p className="text-sm text-base-content/50">
            Parcels you make will appear here automatically.
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="table table-zebra bg-secondary/20 font-semibold w-full">
            <thead>
              <tr className="text-primary bg-secondary text-lg">
                <th>No.</th>
                <th>Parcel Title</th>
                <th>Parcel Cost</th>
                <th>Payment Status</th>
                <th>Delivery Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {parcels.map((parcel, index) => {
                // Standardizing casing check (supports both payment_status and paymentStatus)
                const isPaid =
                  parcel.payment_status === "paid" ||
                  parcel.paymentStatus === "paid";

                return (
                  <tr key={parcel._id || index}>
                    <td>{index + 1}</td>
                    <td>{parcel.parcelTitle}</td>
                    <td>{parcel.cost || "---"} TK</td>
                    <td>
                      {isPaid ? (
                        <span className="badge badge-success text-white font-semibold">
                          Paid
                        </span>
                      ) : (
                        <button
                          onClick={() => handlePayment(parcel)}
                          className="btn btn-sm btn-secondary text-white"
                        >
                          Pay
                        </button>
                      )}
                    </td>
                    <td>{parcel.parcelSatatus || "Not Find"}</td>
                    <td>
                      <div className="space-x-2 flex">
                        <button className="btn btn-square btn-sm text-secondary hover:bg-secondary hover:text-white">
                          <FaEdit />
                        </button>
                        <button className="btn btn-square btn-sm text-green-600 hover:text-white hover:bg-green-600">
                          <TbListDetailsFilled />
                        </button>
                        <button
                          onClick={() => handleMyParcelsDelete(parcel._id)}
                          className="btn btn-square btn-sm text-red-600 hover:bg-red-600 hover:text-white"
                        >
                          <MdAutoDelete />
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default MyParcels;
