import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { data } from "react-router";
import { FaUsers } from "react-icons/fa";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const { data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("users");
      return res.data;
    },
  });
  return (
    <div>
      {/* Head */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-primary p-4 md:p-6 rounded-2xl shadow-sm border border-secondary">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-base-content">
            <FaUsers className="text-secondary" />
            User Management
          </h2>
          <p className="text-sm text-base-content/80 mt-1">
            Track and manage all your User
          </p>
        </div>
        <div className="stat text-secondary bg-secondary rounded-xl w-auto py-2 px-6">
          <div className="stat-title font-semibold text-primary">
            Total Users
          </div>
          <div className=" text-white stat-value text-2xl">{users.length}</div>
        </div>
      </div>
      {/* table */}
      <p>{users.length}</p>
    </div>
  );
};

export default UserManagement;
