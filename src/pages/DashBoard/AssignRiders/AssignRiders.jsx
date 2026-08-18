import React, { useRef, useState } from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";
import { MdOutlineAssignmentInd } from "react-icons/md";
import Swal from "sweetalert2";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();
  const riderModal = useRef();
  const [selectedRiders, setSelectedRiders] = useState(null);

  // 1. Destructure refetch as refetchParcels HERE
  const {
    data: parcels = [],
    isLoading,
    refetch: refetchParcels,
  } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?parcelSatatus=pending-pickup",
      );
      return res.data;
    },
  });

  // 2. Destructure refetch for riders separately
  const { data: riders = [], refetch: refetchRiders } = useQuery({
    queryKey: ["riders", "approved", "Available", selectedRiders?.senderArea],
    enabled: Boolean(selectedRiders?.senderArea),
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

  const handleAssignRider = (rider) => {
    const riderAssignInfo = {
      riderId: rider._id,
      riderName: rider.name,
      riderEmail: rider.email,
      parcelId: selectedRiders._id,
    };

    axiosSecure
      .patch(`/parcels/${selectedRiders._id}`, riderAssignInfo)
      .then((res) => {
        if (res.data?.parcelResult?.modifiedCount > 0) {
          riderModal.current?.close();

          // Refetch the pending parcels table so the assigned item disappears
          refetchParcels();

          Swal.fire({
            position: "top-end",
            icon: "success",
            title: `Rider ${rider.name} has been assigned`,
            showConfirmButton: false,
            timer: 1500,
          });
        }
      })
      .catch((error) => {
        console.error("Assignment error:", error);
        Swal.fire({
          icon: "error",
          title: "Assignment Failed",
          text: "Could not assign rider to this parcel.",
        });
      });
  };

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
              <th>Available Riders</th>
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
                    Available Riders
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
          <div className="modal-box w-11/12 max-w-2xl">
            <div className="overflow-x-auto">
              <table className="table table-zebra">
                <thead className="bg-secondary text-white font-bold">
                  <tr>
                    <th>No.</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Assign Riders</th>
                  </tr>
                </thead>
                <tbody className="bg-secondary/20 font-semibold">
                  {riders.length > 0 ? (
                    riders.map((rider, index) => (
                      <tr key={rider._id || index}>
                        <th>{index + 1}</th>
                        <td>{rider.name}</td>
                        <td>{rider.email}</td>
                        <td>
                          <button
                            onClick={() => handleAssignRider(rider)}
                            className="btn btn-sm btn-secondary btn-outline font-bold"
                          >
                            Assign
                          </button>
                        </td>
                      </tr>
                    ))
                  ) : (
                    <tr>
                      <td colSpan="4" className="text-center py-6">
                        No available riders found in this area.
                      </td>
                    </tr>
                  )}
                </tbody>
              </table>
            </div>
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
