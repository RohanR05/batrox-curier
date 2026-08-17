import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { TbMotorbikeFilled } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp } from "react-icons/io5";
import { FaTrashCan } from "react-icons/fa6";
import Swal from "sweetalert2";

const RiderApprove = () => {
  const axiosSecure = useAxiosSecure();

  const { refetch, data: riders = [] } = useQuery({
    queryKey: ["riders", "pending"],
    queryFn: async () => {
      const res = await axiosSecure.get("/riders");
      return res.data;
    },
  });

  const updateRiderStatus = async (rider, status, workStatus) => {
    try {
      const updateInfo = {
        status,
        workStatus,
        email: rider?.email,
      };

      const res = await axiosSecure.patch(`/riders/${rider?._id}`, updateInfo);

      if (res.data.modifiedCount > 0) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status is set to ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Update Failed",
        text: error.response?.data?.message || "Something went wrong!",
      });
    }
  };

  const handleRiderApprove = (rider) => {
    updateRiderStatus(rider, "approved", "Available");
  };

  const handleRiderReject = (rider) => {
    updateRiderStatus(rider, "rejected", "Unavailable");
  };

  const handleDeleteRider = (rider) => {
    Swal.fire({
      title: "Are you sure?",
      text: `Delete rider "${rider.name}" permanently?`,
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#d33",
      cancelButtonColor: "#3085d6",
      confirmButtonText: "Yes, delete it!",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.delete(`/riders/${rider._id}`);
          if (res.data.deletedCount > 0) {
            refetch();
            Swal.fire("Deleted!", "Rider has been deleted.", "success");
          }
        } catch (error) {
          Swal.fire({
            icon: "error",
            title: "Delete Failed",
            text: error.response?.data?.message || "Could not delete rider.",
          });
        }
      }
    });
  };

  return (
    <div className="">
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-primary p-4 md:p-6 rounded-2xl shadow-sm border border-secondary">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-base-content">
            <TbMotorbikeFilled className="text-secondary" /> Rider Approval
            Section
          </h2>
          <p className="text-sm text-base-content/70 mt-1">
            Approve and manage all your riders.
          </p>
        </div>
        <div className="stat text-secondary bg-secondary rounded-xl w-auto py-2 px-6">
          <div className="stat-title font-semibold text-primary">
            Total Riders
          </div>
          <div className="text-white stat-value text-2xl">{riders.length}</div>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x- font-semibold">
        <table className="table table-zebra w-full bg-secondary/20">
          <thead>
            <tr className="bg-secondary text-primary font-bold">
              <th>#</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>
              <th>Work Status</th>
              <th className="text-center">Actions</th>
            </tr>
          </thead>
          <tbody className="">
            {riders.map((rider, index) => (
              <tr key={rider._id || index}>
                <th>{index + 1}</th>
                <td className="font-medium">{rider.name || "N/A"}</td>
                <td className="text-sm text-base-content/80">
                  {rider.email || "N/A"}
                </td>
                <td>{rider.riderDistrict || "N/A"}</td>

                {/* Rider Approval Status */}
                <td>
                  <span
                    className={`inline-block font-mono text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                      rider.status === "approved"
                        ? "bg-emerald-100 text-emerald-800"
                        : rider.status === "rejected"
                          ? "bg-red-100 text-red-800"
                          : "bg-amber-100 text-amber-800"
                    }`}
                  >
                    {rider.status || "pending"}
                  </span>
                </td>

                {/* Work Status Badge */}
                <td>
                  <span
                    className={`inline-block font-mono text-xs font-semibold px-2.5 py-1 rounded-full capitalize ${
                      rider.workStatus === "Available"
                        ? "bg-blue-100 text-blue-800"
                        : "bg-gray-200 text-gray-700"
                    }`}
                  >
                    {rider.workStatus || "Unavailable"}
                  </span>
                </td>

                {/* Actions */}
                <td>
                  <div className="flex items-center justify-center gap-1">
                    <button
                      title="Approve Rider"
                      onClick={() => handleRiderApprove(rider)}
                      className="btn btn-sm btn-secondary btn-outline hover:bg-secondary"
                    >
                      <FaUserCheck />
                    </button>
                    <button
                      title="Reject Rider"
                      onClick={() => handleRiderReject(rider)}
                      className="btn btn-error btn-sm btn-outline hover:btn-error"
                    >
                      <IoPersonRemoveSharp />
                    </button>
                    <button
                      title="Delete Rider"
                      onClick={() => handleDeleteRider(rider)}
                      className="btn btn-accent btn-outline btn-sm"
                    >
                      <FaTrashCan />
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

export default RiderApprove;
