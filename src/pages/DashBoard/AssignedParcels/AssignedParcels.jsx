import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import useAuth from "../../../Hooks/useAuth";
import { FaBoxesPacking } from "react-icons/fa6";
import Loading from "../../../Components/Loading/Loading";
import Swal from "sweetalert2";

const AssignedParcels = () => {
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();

  const {
    data: parcels = [],
    refetch,
    isLoading,
  } = useQuery({
    queryKey: ["riderParcels", user?.email, "rider-assigned"],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/rider", {
        params: {
          riderEmail: user?.email,
          delivaryStatus: "rider-assigned",
        },
      });
      return res.data;
    },
    enabled: !!user?.email, // Only fetch when user email is available
  });

  const handleAcceptDelivery = (parcel) => {
    const statusInfo = { parcelStatus: "rider_arriving" }; // Match your backend field name

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        // Check modifiedCount (standard MongoDB update response property)
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Delivery accepted successfully!`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Error updating delivery status:", error);
      });
  };

  const handleRejectDelivery = (parcel) => {
    const statusInfo = { parcelStatus: "cancelled" }; // or "rejected" based on your backend logic

    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, statusInfo)
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "error",
            title: "Delivery Rejected",
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => console.error("Error rejecting delivery:", error));
  };

  if (isLoading) {
    return <Loading></Loading>;
  }

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-primary p-4 md:p-6 rounded-2xl shadow-sm border border-secondary">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-base-content">
            <FaBoxesPacking className="text-secondary" /> Assgin Parcels
          </h2>
          <p className="text-sm text-base-content/70 mt-1">
            Manage and track your assigned delivery parcels, view pickup
            locations, and update real-time status all in one place.
          </p>
        </div>
        <div className="stat text-secondary bg-secondary rounded-xl w-auto py-2 px-6">
          <div className="stat-title font-semibold text-primary">
            Total Assigned Parcels
          </div>
          <div className=" text-white stat-value text-2xl">
            {parcels.length}
          </div>
        </div>
      </div>
      {/* table */}
      <div className="overflow-x-auto">
        {parcels.length === 0 ? (
          <div className="text-center py-12 px-4">
            <FaBoxesPacking className="mx-auto text-4xl text-base-content/30 mb-3" />
            <h3 className="text-lg font-semibold text-base-content/70">
              No Assgined Parcels Found
            </h3>
          </div>
        ) : (
          <table className="table table-zebra">
            <thead className="bg-secondary text-primary font-bold text-base">
              <tr>
                <th># & Title</th>
                <th>Sender Details</th>
                <th>Receiver Details</th>
                <th>Tracking & Cost</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody className="bg-secondary/20 font-medium">
              {parcels.map((parcel, index) => (
                <tr
                  key={parcel._id || index}
                  className="hover:bg-base-200/50 transition-colors"
                >
                  {/* Index & Title */}
                  <th>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-bold opacity-70">
                        #{index + 1}
                      </span>
                      <span className="font-semibold bg-secondary/10 text-secondary px-2.5 py-1 rounded-md text-sm border border-secondary/20">
                        {parcel.parcelTitle || "N/A"}
                      </span>
                    </div>
                  </th>

                  {/* Sender Info */}
                  <td>
                    <div className="font-bold text-base-content">
                      {parcel.senderName}
                    </div>
                    <div className="text-xs text-base-content/70">
                      {parcel.senderAddress}, {parcel.senderArea}
                    </div>
                  </td>

                  {/* Receiver Info */}
                  <td>
                    <div className="font-bold text-base-content">
                      {parcel.receiverName}
                    </div>
                    <div className="text-xs text-base-content/70">
                      {parcel.receiverAddress}, {parcel.receiverArea}
                    </div>
                  </td>

                  {/* Tracking ID & Cost */}
                  <td>
                    <div className="font-mono text-xs bg-base-200 px-2 py-0.5 rounded w-max text-base-content font-bold">
                      {parcel.trackingId}
                    </div>
                    <div className="text-xs text-success font-bold mt-1">
                      {parcel.cost} BDT ({parcel.weight} kg)
                    </div>
                  </td>
                  {/* Action Buttons */}
                  <td className="flex items-center gap-2">
                    {parcel.parcelStatus === "rider_assigned" ? (
                      <>
                        <button
                          onClick={() => handleAcceptDelivery(parcel)}
                          className="btn btn-sm bg-success text-white hover:bg-success/80 border-none font-bold gap-1 shadow-xs"
                          title="Accept Delivery"
                        >
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Accept
                        </button>
                        <button
                          onClick={() => handleRejectDelivery(parcel)}
                          className="btn btn-sm bg-error text-white hover:bg-error/80 border-none font-bold gap-1 shadow-xs"
                          title="Reject Delivery"
                        >
                          <svg
                            className="w-4 h-4 fill-current"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Reject
                        </button>
                      </>
                    ) : (
                      <span className="capitalize font-semibold text-gray-600">
                        {parcel.parcelStatus?.replace("_", " ") || "N/A"}
                      </span>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
  );
};

export default AssignedParcels;
