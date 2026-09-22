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
    queryKey: ["riderParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get("/parcels/rider", {
        params: {
          riderEmail: user?.email,
        },
      });
      return res.data;
    },
    enabled: !!user?.email,
  });

  // Reusable master status updater function
  const updateParcelStatus = (
    parcel,
    newStatus,
    successTitle,
    icon = "success",
  ) => {
    axiosSecure
      .patch(`/parcels/${parcel._id}/status`, {
        parcelStatus: newStatus,
        riderId: parcel.riderId,
      })
      .then((res) => {
        if (res.data.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: icon,
            title: successTitle,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) =>
        console.error(`Error updating status to ${newStatus}:`, error),
      );
  };

  // Specific Action Handlers
  const handleAcceptDelivery = (parcel) => {
    updateParcelStatus(
      parcel,
      "rider_arriving",
      "Delivery accepted successfully!",
    );
  };

  const handleRejectDelivery = (parcel) => {
    updateParcelStatus(parcel, "cancelled", "Delivery Rejected", "error");
  };

  const handleUpdateStatus = (parcel, nextStatus) => {
    const statusMessages = {
      in_transit: "Marked as Picked Up!",
      delivered: "Parcel Delivered Successfully!",
    };
    updateParcelStatus(
      parcel,
      nextStatus,
      statusMessages[nextStatus] || "Status updated!",
    );
  };

  if (isLoading) {
    return <Loading />;
  }

  return (
    <div>
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-primary p-4 md:p-6 rounded-2xl shadow-sm border border-secondary">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-base-content">
            <FaBoxesPacking className="text-secondary" /> Assigned Parcels
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
          <div className="text-white stat-value text-2xl">{parcels.length}</div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        {parcels.length === 0 ? (
          <div className="text-center py-12 px-4">
            <FaBoxesPacking className="mx-auto text-4xl text-base-content/30 mb-3" />
            <h3 className="text-lg font-semibold text-base-content/70">
              No Assigned Parcels Found
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

                  {/* Dynamic Action Buttons */}
                  <td className="flex items-center gap-2">
                    {/* Stage 1: Initial assignment decision */}
                    {parcel.parcelStatus === "rider_assigned" && (
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
                    )}

                    {/* Stage 2: Pickup progression */}
                    {parcel.parcelStatus === "rider_arriving" && (
                      <button
                        onClick={() => handleUpdateStatus(parcel, "in_transit")}
                        className="btn btn-sm bg-warning text-white hover:bg-warning/80 border-none font-bold gap-1 shadow-xs"
                        title="Mark as Picked Up"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path d="M8 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0zM15 16.5a1.5 1.5 0 11-3 0 1.5 1.5 0 013 0z" />
                          <path d="M3 4a1 1 0 00-1 1v10a1 1 0 001 1h1.05a2.5 2.5 0 014.9 0h4.1a2.5 2.5 0 014.9 0H17a1 1 0 001-1v-5l-3-4H3z" />
                        </svg>
                        Picked Up
                      </button>
                    )}

                    {/* Stage 3: Delivery progression */}
                    {parcel.parcelStatus === "in_transit" && (
                      <button
                        onClick={() => handleUpdateStatus(parcel, "delivered")}
                        className="btn btn-sm bg-success text-white hover:bg-success/80 border-none font-bold gap-1 shadow-xs"
                        title="Mark as Delivered"
                      >
                        <svg
                          className="w-4 h-4 fill-current"
                          viewBox="0 0 20 20"
                        >
                          <path
                            fillRule="evenodd"
                            d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                            clipRule="evenodd"
                          />
                        </svg>
                        Delivered
                      </button>
                    )}

                    {/* Stage 4: Completed badge */}
                    {parcel.parcelStatus === "delivered" && (
                      <span className="badge badge-success text-white font-medium p-2">
                        Completed
                      </span>
                    )}

                    {/* Terminal status badge */}
                    {parcel.parcelStatus === "cancelled" && (
                      <span className="badge badge-error text-white font-medium p-2">
                        Cancelled
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
