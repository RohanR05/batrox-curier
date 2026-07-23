import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import {
  FaReceipt,
  FaHashtag,
  FaEnvelope,
  FaCalendarAlt,
  FaCheckCircle,
  FaBox,
} from "react-icons/fa";
import { MdOutlineAttachMoney } from "react-icons/md";

const PaymentHistory = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const { data: payments = [], isLoading } = useQuery({
    queryKey: ["payments", user?.email],
    enabled: !!user?.email, // Only fetch when user email is available
    queryFn: async () => {
      const res = await axiosSecure.get(`payments?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div className="p-1 md:p-3 max-w-7xl mx-auto">
      {/* Header Section */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-primary/20 p-4 md:p-6 rounded-2xl shadow-sm border border-base-200">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-base-content">
            <FaReceipt className="text-secondary" /> Payment History
          </h2>
          <p className="text-sm text-base-content/70 mt-1">
            Track and manage all your parcel delivery transactions.
          </p>
        </div>
        <div className="stat text-secondary bg-secondary/10 rounded-xl w-auto py-2 px-6">
          <div className="stat-title font-semibold">Total Transactions</div>
          <div className="stat-value text-2xl">{payments.length}</div>
        </div>
      </div>

      {/* Table Container */}
      <div className="bg-primary/40 rounded-2xl shadow-sm border border-base-200 overflow-hidden">
        {isLoading ? (
          <div className="flex justify-center items-center p-12">
            <span className="loading loading-spinner loading-lg text-primary"></span>
          </div>
        ) : payments.length === 0 ? (
          <div className="text-center py-12 px-4">
            <FaReceipt className="mx-auto text-4xl text-base-content/30 mb-3" />
            <h3 className="text-lg font-semibold text-base-content/70">
              No Payment Records Found
            </h3>
            <p className="text-sm text-base-content/50">
              Payments you make will appear here automatically.
            </p>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="table table-zebra w-full">
              {/* Table Head */}
              <thead className="bg-base-200/50 text-base-content/70 uppercase text-xs">
                <tr>
                  <th>#</th>
                  <th>
                    <span className="flex items-center gap-1">
                      <FaEnvelope /> Customer Email
                    </span>
                  </th>
                  <th>
                    <span className="flex items-center gap-1">
                      <FaBox /> Parcel ID
                    </span>
                  </th>
                  <th>
                    <span className="flex items-center gap-1">
                      <MdOutlineAttachMoney /> Amount
                    </span>
                  </th>
                  <th>
                    <span className="flex items-center gap-1">
                      <FaHashtag /> Transaction ID
                    </span>
                  </th>
                  <th>
                    <span className="flex items-center gap-1">
                      <FaCalendarAlt /> Date & Time
                    </span>
                  </th>
                  <th>Status</th>
                </tr>
              </thead>

              {/* Table Body */}
              <tbody>
                {payments.map((payment, index) => (
                  <tr key={payment._id || index} className="hover">
                    <td className="font-semibold text-base-content/60">
                      {index + 1}
                    </td>

                    {/* Customer Email */}
                    <td className="font-medium">
                      {payment.customer_email || user?.email}
                    </td>

                    {/* Parcel ID */}
                    <td>
                      <span className="font-mono text-xs bg-base-200 px-2 py-1 rounded text-base-content/80">
                        {payment.parcelId || "N/A"}
                      </span>
                    </td>

                    {/* Amount */}
                    <td className="font-bold text-success">
                      $
                      {typeof payment.amount === "number"
                        ? payment.amount.toFixed(2)
                        : payment.amount}
                    </td>

                    {/* Transaction ID */}
                    <td>
                      <span className="font-mono text-xs text-secondary bg-primary px-2 py-1 rounded">
                        {payment.transactionId}
                      </span>
                    </td>

                    {/* Paid At */}
                    <td className="text-sm text-base-content/70">
                      {payment.paidAt
                        ? new Date(payment.paidAt).toLocaleString()
                        : "N/A"}
                    </td>

                    {/* Status Badge */}
                    <td>
                      <span className="badge badge-success badge-sm gap-1 text-white py-2">
                        <FaCheckCircle className="text-xs" /> Paid
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
};

export default PaymentHistory;
