import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const CompletedDelivary = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();
  const { data: parcels = [], refetch } = useQuery({
    queryKey: ["parcels", user?.email, "delivered"],
    queryFn: async () => {
      const res = await axiosSecure.get("parcels/rider", {
        params: {
          riderEmail: user?.email,
          parcelStatus: "delivered",
        },
      });
      return res.data;
    },
    enabled: !!user.email,
  });
  return <div>{parcels.length}</div>;
};

export default CompletedDelivary;
