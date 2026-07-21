import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { TbListDetailsFilled } from "react-icons/tb";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import Loading from "../../../Components/Loading/Loading";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  // Fetch list of parcels for current user
  const {
    isLoading,
    data: parcels = [],
    refetch,
  } = useQuery({
    queryKey: ["myParcels", user?.email],
    enabled: !!user?.email, // Only run query when user email exists
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

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

  if (isLoading) return <Loading />;

  return (
    <div>
      <h2 className="text-2xl font-bold my-4">Welcome to my parcels page</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra w-full">
          <thead>
            <tr className="text-secondary text-lg">
              <th>No.</th>
              <th>Parcel Title</th>
              <th>Parcel Cost</th>
              <th>Payment Status</th>
              <th>Delivery Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {parcels.map((parcel, index) => (
              <tr key={parcel._id || index}>
                <td>{index + 1}</td>
                <td>{parcel.parcelTitle}</td>
                <td>{parcel.cost || "---"} TK</td>
                <td>
                  {parcel.paymentStatus === "paid" ? (
                    <span className="badge badge-success text-white">Paid</span>
                  ) : (
                    <button
                      onClick={() => handlePayment(parcel)}
                      className="btn btn-sm btn-secondary text-white"
                    >
                      Pay
                    </button>
                  )}
                </td>
                <td>{parcel.status || "Pending"}</td>
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
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
