import React, { useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { FaUsers } from "react-icons/fa";
import Swal from "sweetalert2";

const UserManagement = () => {
  const axiosSecure = useAxiosSecure();
  const [searchText, setSearchText] = useState("");

  const { refetch, data: users = [] } = useQuery({
    queryKey: ["users", searchText],
    queryFn: async () => {
      const res = await axiosSecure.get(`users?searchText=${searchText}`);
      return res.data;
    },
  });

  const updateUserRole = (user, newRole) => {
    // Avoid API request if role hasn't changed
    if (user.role === newRole) return;

    axiosSecure
      .patch(`/user/${user._id}/role`, { role: newRole })
      .then((res) => {
        if (res.data?.modifiedCount > 0) {
          refetch();
          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `${user.displayName || "User"}'s role updated to ${newRole}`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Failed to update role:", error);
        Swal.fire({
          icon: "error",
          title: "Update Failed",
          text: error.response?.data?.message || "Could not update user role.",
        });
      });
  };

  return (
    <div>
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-primary p-4 md:p-6 rounded-2xl shadow-sm border border-secondary">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-base-content">
            <FaUsers className="text-secondary" />
            User Management
          </h2>
          <p className="text-sm text-base-content/80 mt-1">
            Track and manage all registered platform users
          </p>
        </div>
        <div className="stat text-secondary bg-secondary rounded-xl w-auto py-2 px-6">
          <div className="stat-title font-semibold text-primary">
            Total Users
          </div>
          <div className="text-white stat-value text-2xl">{users.length}</div>
        </div>
      </div>

      {/* Search Bar */}
      <div className="mb-6 flex items-center gap-4 flex-wrap">
        <label className="input input-bordered flex items-center gap-2 max-w-xs">
          <svg
            className="h-4 w-4 opacity-50"
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
              <circle cx="11" cy="11" r="8" />
              <path d="m21 21-4.3-4.3" />
            </g>
          </svg>
          <input
            onChange={(e) => setSearchText(e.target.value)}
            type="search"
            placeholder="Search Name or Email"
            className="grow"
          />
        </label>
        {searchText && (
          <h2 className="bg-primary py-2 px-4 rounded-xl font-semibold border-2 border-secondary text-sm">
            <strong>Search Filter:</strong> {searchText}
          </h2>
        )}
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto font-semibold">
        <table className="table table-zebra w-full">
          {/* Table Head */}
          <thead className="bg-secondary text-primary font-bold text-base">
            <tr>
              <th>#</th>
              <th>User</th>
              <th>Email</th>
              <th>Current Role</th>
              <th>Change Role</th>
              <th>Status</th>
            </tr>
          </thead>

          {/* Table Body */}
          <tbody className="bg-secondary/20">
            {users.length > 0 ? (
              users.map((user, index) => (
                <tr key={user._id || index}>
                  <th>{index + 1}</th>

                  {/* User Profile */}
                  <td>
                    <div className="flex items-center gap-3">
                      <div className="avatar">
                        <div className="mask mask-squircle h-10 w-10 bg-base-200">
                          <img
                            src={
                              user?.photoURL ||
                              "https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                            }
                            alt={user?.displayName || "User Avatar"}
                          />
                        </div>
                      </div>
                      <div>
                        <div className="font-bold">
                          {user?.displayName || user?.name || "Unnamed User"}
                        </div>
                      </div>
                    </div>
                  </td>

                  {/* Email */}
                  <td>
                    <span className="font-mono text-sm bg-base-200 px-2.5 py-1 rounded-md text-base-content">
                      {user.email || "N/A"}
                    </span>
                  </td>

                  {/* Role Badge */}
                  <td>
                    <span
                      className={`badge badge-sm font-bold capitalize px-3 py-2 text-white ${
                        user.role === "admin"
                          ? "badge-error"
                          : user.role === "rider"
                            ? "badge-secondary"
                            : "badge-neutral"
                      }`}
                    >
                      {user.role || "user"}
                    </span>
                  </td>

                  {/* Change Role Action Dropdown */}
                  <td>
                    <div className="flex items-center gap-2">
                      <span
                        className={`inline-block w-2.5 h-2.5 rounded-full ${
                          user.role === "admin"
                            ? "bg-error"
                            : user.role === "rider"
                              ? "bg-warning"
                              : "bg-success"
                        }`}
                      />
                      <select
                        value={user.role || "user"}
                        onChange={(e) => updateUserRole(user, e.target.value)}
                        className="select select-sm bg-secondary text-white border-secondary focus:outline-none focus:ring-2 focus:ring-secondary/50 font-semibold capitalize cursor-pointer rounded-lg shadow-xs"
                      >
                        <option
                          value="user"
                          className="bg-base-100 text-base-content font-medium"
                        >
                          User
                        </option>
                        <option
                          value="rider"
                          className="bg-base-100 text-base-content font-medium"
                        >
                          Rider
                        </option>
                        <option
                          value="admin"
                          className="bg-base-100 text-base-content font-medium"
                        >
                          Admin
                        </option>
                      </select>
                    </div>
                  </td>

                  {/* Status Indicator */}
                  <td>
                    <span className="badge badge-outline badge-success text-xs font-bold">
                      Active
                    </span>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  colSpan="6"
                  className="text-center py-6 text-base-content/60"
                >
                  No users found matching your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default UserManagement;
