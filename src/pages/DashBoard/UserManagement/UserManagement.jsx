import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { data } from "react-router";
import { FaUsers } from "react-icons/fa";
import { FaShield } from "react-icons/fa6";
import { FiShieldOff } from "react-icons/fi";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");
  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const res = await axiosSecure.get("users");
      return res.data;
    },
  });

  const updateUserRole = (user, role) => {
    axiosSecure.patch(`/user/${user._id}`, { role }).then((res) => {
      if (res.data.modifiedCount) {
        refetch();
        Swal.fire({
          position: "top-end",
          icon: "success",
          title: `${user.displayName} Role is set to ${role}`,
          showConfirmButton: false,
          timer: 1500,
        });
      }
    });
  };

  const handleAdminRole = (user) => {
    updateUserRole(user, "admin");
  };

  const handleRemoveAdmin = (user) => {
    updateUserRole(user, "user");
  };

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
      {/* search */}
      <div className="mb-6 flex items-center gap-6 flex-wrap">
        <label className="input">
          <svg
            className="h-[1em] opacity-50"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
          >
            <g
              strokeLinejoin="round"
              strokeLinecap="round"
              strokeWidth="2.5"
              fill="none"
              stroke="currentColor"
            >
              <circle cx="11" cy="11" r="8"></circle>
              <path d="m21 21-4.3-4.3"></path>
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            required
            placeholder="Search Name || Email"
          />
        </label>
        <h2 className="bg-primary py-1.5 rounded-2xl px-2 font-semibold flex-1 border-2 border-secondary">
          <strong>Search Result:</strong> {searchText}
        </h2>
      </div>
      {/* table */}
      <div className="overflow-x-auto bg-primary text-secondary font-semibold border rounded-2xl">
        <table className="table">
          {/* head */}
          <thead className="bg-secondary text-primary font-bold text-lg">
            <tr>
              <th>No</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Admin Action</th>
              <th>Others Actions</th>
            </tr>
          </thead>
          <tbody>
            {users.map((user, index) => (
              <tr key={index}>
                <th>{index + 1}</th>
                <td>
                  <div className="flex items-center gap-3">
                    <div className="avatar">
                      <div className="mask mask-squircle h-12 w-12">
                        <img src={user?.photoURL || ""} />
                      </div>
                    </div>
                  </div>
                </td>
                <td>{user.email}</td>
                <td>
                  <strong>{user.role}</strong>
                </td>
                <td>
                  {user.role === "admin" ? (
                    <button
                      onClick={() => handleRemoveAdmin(user)}
                      className="btn bg-red-600 text-primary"
                    >
                      <FiShieldOff></FiShieldOff>
                    </button>
                  ) : (
                    <button
                      onClick={() => handleAdminRole(user)}
                      className="btn btn-secondary btn-outline"
                    >
                      <FaShield></FaShield>
                    </button>
                  )}
                </td>
                <td>working</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
