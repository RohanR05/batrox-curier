import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { TbMotorbikeFilled } from "react-icons/tb";
import { FaUserCheck } from "react-icons/fa";
import { IoPersonRemoveSharp, IoRemoveSharp } from "react-icons/io5";
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

  const updateRiderStatus = (rider, status) => {
    const updateInfo = { status: status, email: rider.email };
    axiosSecure.patch(`/riders/${rider._id}`, updateInfo).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `Rider status is set to ${status}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleRiderApprovee = (rider) => {
    updateRiderStatus(rider, "approved");
  };

  const handleRiderReject = (rider) => {
    updateRiderStatus(rider, "rejected");
  };
  return (
    <div>
      {" "}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-primary p-4 md:p-6 rounded-2xl shadow-sm border border-secondary">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-base-content">
            <TbMotorbikeFilled className="text-secondary" /> Rider Approval
            Section
          </h2>
          <p className="text-sm text-base-content/70 mt-1">
            Approve and manage all your Ride.
          </p>
        </div>
        <div className="stat text-secondary bg-secondary rounded-xl w-auto py-2 px-6">
          <div className="stat-title font-semibold text-primary">
            Total Rider
          </div>
          <div className=" text-white stat-value text-2xl">{riders.length}</div>
        </div>
      </div>
      <div className="overflow-x-auto rounded-box border border-secondary text-secondary font-bold bg-primary">
        <table className="table">
          {/* head */}
          <thead>
            <tr className="bg-secondary text-primary">
              <th>NO</th>
              <th>Name</th>
              <th>Email</th>
              <th>District</th>
              <th>Status</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {riders.map((rider, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>{rider.name}</td>
                <td>{rider.email}</td>
                <td>{rider.riderDistrict}</td>
                <td
                  className={`${rider.status === "approved" ? "text-secondary" : "text-red-600"}`}
                >
                  {rider.status}
                </td>
                <td className="space-x-1">
                  <button
                    onClick={() => handleRiderApprovee(rider)}
                    className="btn btn-sm btn-secondar btn-outline hover:bg-secondary"
                  >
                    <FaUserCheck></FaUserCheck>
                  </button>
                  <button
                    onClick={() => handleRiderReject(rider)}
                    className="btn btn-secondar btn-outline btn-sm hover:bg-secondary"
                  >
                    <IoPersonRemoveSharp></IoPersonRemoveSharp>
                  </button>
                  <button className="btn btn-accent btn-outline btn-sm hover:bg-secondary">
                    <FaTrashCan></FaTrashCan>
                  </button>
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
