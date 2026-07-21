import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { TbListDetailsFilled } from "react-icons/tb";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";
import Swal from "sweetalert2";
import { Link, useParams } from "react-router";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  
  const { parcelId } = useParams();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    if (!parcel) return;

    try {
      const paymentInfo = {
        cost: parcel.cost,
        parcelId: parcel._id,
        senderEmail: parcel.senderEmail,
        parcelTitle: parcel.parcelTitle,
      };

      const res = await axiosSecure.post(
        "/create-checkout-session",
        paymentInfo,
      );

      // Redirect user to Stripe Checkout
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment redirect failed:", error);
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
      if (result.isConfirmed)
        axiosSecure.delete(`/parcels/${id}`).then((res) => {
          console.log(res.data);
          if (res.data.deletedCount) {
            refetch();
            Swal.fire({
              title: "Deleted!",
              text: "Your parcel has been deleted.",
              icon: "success",
            });
          }
        });
    });
  };

  return (
    <div>
      <h2>Welcome to my parcels page</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
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
            {/* row 1 */}
            {parcels.map((parcel, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <th>{parcel.parcelTitle}</th>
                <th>{parcel.cost}</th>
                <th>
                  {parcel.paymentStatus === "paid" ? (
                    <strong className="text-green-600">Paid</strong>
                  ) : (
                    <button
                      onClick={handlePayment}
                      className="btn btn-square text-secondary border border-secondary"
                    >
                      Pay
                    </button>
                  )}
                </th>
                <th>Under Development</th>
                <th className="">
                  <div className=" space-x-2">
                    <button className="btn btn-square text-secondary hover:bg-secondary hover:text-white">
                      <FaEdit />
                    </button>
                    <button className="btn btn-square text-green-600 hover:text-white hover:bg-green-600">
                      <TbListDetailsFilled />
                    </button>
                    <button
                      onClick={() => handleMyParcelsDelete(parcel._id)}
                      className="btn btn-square text-red-600 hover:bg-red-600 hover:text-white"
                    >
                      <MdAutoDelete />
                    </button>
                  </div>
                </th>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default MyParcels;
