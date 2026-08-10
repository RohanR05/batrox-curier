import React from "react";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const AssignRiders = () => {
  const axiosSecure = useAxiosSecure();

  const { data: parcels = [], isLoading } = useQuery({
    queryKey: ["parcels", "pending-pickup"],
    queryFn: async () => {
      const res = await axiosSecure.get(
        "/parcels?parcelSatatus=pending-pickup",
      );
      return res.data;
    },
  });

  return (
    <div>
      <h2>{parcels.length}</h2>
    </div>
  );
};

export default AssignRiders;
