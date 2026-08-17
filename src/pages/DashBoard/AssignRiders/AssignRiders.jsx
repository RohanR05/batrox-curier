import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import { MdOutlineAssignmentInd } from "react-icons/md";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const riderModal = useRef();
  const [selectedRiders, setSelectedRiders] = useState(null);

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?parcelSatatus=pending-pickup",
      );
      return res.data;
    },
  });

  const { data: riders = [] } = useQuery({
    queryKey: [
      "riders",
      "approved",

      "Available",
      selectedRiders?.senderArea, // Changed riderDistrict -> senderArea
    ],
    enabled: Boolean(selectedRiders?.senderArea), // Safe check
    queryFn: async () => {
      const res = await axiosSecure.get("/riders", {
        params: {
          status: "approved",
          district: selectedRiders?.senderArea,
          workStatus: "Available",
        },
      });
      return res.data;
    },
  });

  if (isLoading) {
    return <Loading />;
  }

  const handleOpenRiderModal = (parcel) => {
    setSelectedRiders(parcel);
    riderModal.current?.showModal();
  };

  return (
    <div>
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 bg-primary p-4 md:p-6 rounded-2xl shadow-sm border border-secondary">
        <div>
          <h2 className="text-2xl font-bold flex items-center gap-2 text-base-content">
            <MdOutlineAssignmentInd className="text-secondary" />
            Paid and Pending Parcels Info
          </h2>
          <p className="text-sm text-base-content/70 mt-1">
            Paid parcels and ready to assign Riders
          </p>
        </div>
        <div className="stat text-secondary bg-secondary rounded-xl w-auto py-2 px-6">
          <div className="stat-title font-semibold text-primary">
            Total Pending Pickup
          </div>
          <div className="text-white stat-value text-2xl">{parcels.length}</div>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto border border-base-content/5 bg-base-200">
        <table className="table table-zebra">
          <thead className="bg-secondary text-primary font-bold">
            <tr>
              <th>No.</th>
              <th>Name</th>
              <th>Cost</th>
              <th>Created At</th>
              <th>Pickup District</th>
              <th>Assign Action</th>
            </tr>
          </thead>
          <tbody className="bg-secondary/20 font-semibold">
            {parcels.map((parcel, index) => (
              <tr key={parcel._id || index}>
                <th>{index + 1}</th>
                <td>
                  <span className="font-mono bg-secondary/20 px-2 py-1 rounded text-black">
                    {parcel.parcelTitle || "N/A"}
                  </span>
                </td>
                <td>{parcel.cost}</td>
                <td>
                  <span className="font-mono bg-secondary/20 px-2 py-1 rounded text-black">
                    {parcel.createdAt || "N/A"}
                  </span>
                </td>
                <td>{parcel.senderArea}</td>
                <td>
                  <button
                    onClick={() => handleOpenRiderModal(parcel)}
                    className="btn btn-secondary btn-sm font-bold btn-outline"
                  >
                    Assign Rider
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Modal */}
      <div>
        <dialog ref={riderModal} id="riderModal" className="modal">
          <div className="modal-box">
            <h3 className="font-bold text-lg">
              Available Riders in {selectedRiders?.senderArea}
            </h3>
            <p className="py-4">Available Count: {riders.length}</p>
          </div>
          <form method="dialog" className="modal-backdrop">
            <button>close</button>
          </form>
        </dialog>
      </div>
    </div>
  );
};

export default AssignRiders;
