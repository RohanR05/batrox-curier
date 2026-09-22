import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { MdLocalShipping } from "react-icons/md";
import Loading from "../../../Components/Loading/Loading";
import { FaBoxesPacking } from "react-icons/fa6";

const CompletedDelivary = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const {
    data: parcels = [],
    isLoading,
    refetch,
  } = useQuery({
    queryKey: ["parcels", user?.email, "delivered"],
    queryFn: async () => {
      const res = await axiosSecure.get("parcels/rider", {
        params: {
          riderEmail: user?.email,
          parcelStatus: "delivered",
        },
      });
      return res.data;
    },
    enabled: !!user.email,
  });

  const calculatePayout = (parcel) => {
    if (parcel.senderArea === parcel.receiverArea) {
      return parcel.cost * 0.6;
    } else {
      return parcel.cost * 0.8;
    }
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
            <MdLocalShipping className="text-secondary" /> Completed Delivary
            and Cash
          </h2>
          <p className="text-sm text-base-content/70 mt-1">
            View all your successfully completed deliveries and past parcel
            history in one place.
          </p>
        </div>
        <div className="stat text-secondary bg-secondary rounded-xl w-auto py-2 px-6">
          <div className="stat-title font-semibold text-primary">
            Total Completed Delivery
          </div>
          <div className="text-white stat-value text-2xl">{parcels.length}</div>
        </div>
      </div>{" "}
      {/* Table Section */}
      <div className="overflow-x-auto">
        {parcels.length === 0 ? (
          <div className="text-center py-12 px-4">
            <FaBoxesPacking className="mx-auto text-4xl text-base-content/30 mb-3" />
            <h3 className="text-lg font-semibold text-base-content/70">
              No Completed Delivery Found
            </h3>
          </div>
        ) : (
          <table className="table table-zebra">
            <thead className="bg-secondary text-primary font-bold text-base">
              <tr>
                <th># & Title</th>
                <th>CreatedAt</th>
                <th>PickUp District</th>
                <th>Cost</th>
                <th>PayOut</th>
                <th>Cash</th>
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

                  {/* created at */}
                  <td>
                    <div className="font-bold text-base-content">
                      {parcel.createdAt}
                    </div>
                  </td>

                  {/* Sending District Info */}
                  <td>
                    <div className="font-bold text-base-content">
                      {parcel.senderArea}
                    </div>
                    <div className="text-xs text-base-content/70">
                      {parcel.senderRegion},
                    </div>
                  </td>

                  {/* Tracking ID & Cost */}
                  <td>
                    <div className="font-mono text-xs bg-base-200 px-2 py-0.5 rounded w-max text-base-content font-bold">
                      {parcel.trackingId}
                    </div>
                    <div className="text-xs text-secondary font-bold mt-1">
                      {parcel.cost} BDT ({parcel.weight} kg)
                    </div>
                  </td>

                  {/* payout */}
                  <td>
                    <div className="font-mono text-xs bg-base-200 px-2 py-0.5 rounded w-max text-base-content font-bold">
                      {calculatePayout(parcel)}
                    </div>
                  </td>

                  {/* Dynamic Action Buttons */}
                  <td className="flex items-center gap-2">
                    <button className="btn btn-sm btn-secondary btn-outline font-bold">
                      CashOut
                    </button>
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

export default CompletedDelivary;
