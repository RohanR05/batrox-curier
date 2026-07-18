import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import { TbListDetailsFilled } from "react-icons/tb";
import { MdAutoDelete } from "react-icons/md";
import { FaEdit } from "react-icons/fa";

const MyParcels = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [] } = useQuery({
    queryKey: ["myParcels", user?.email],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels?email=${user.email}`);
      return res.data;
    },
  });

  return (
    <div>
      <h2>Welcome to my parcels page</h2>
      <div className="overflow-x-auto">
        <table className="table table-zebra">
          {/* head */}
          <thead>
            <tr>
              <th>No.</th>
              <th>Parcel Title</th>
              <th>Parcel Cost</th>
              <th>Payment Status</th>
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
                <th>Working</th>
                <th>
                  <div className=" space-x-2">
                    <button className="btn btn-square text-secondary hover:bg-secondary hover:text-white">
                      <FaEdit />
                    </button>
                    <button className="btn btn-square text-green-600 hover:text-white hover:bg-green-600">
                      <TbListDetailsFilled />
                    </button>
                    <button className="btn btn-square text-red-600 hover:bg-red-600 hover:text-white">
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
