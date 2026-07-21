import React from "react";
import { useParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";
import Loading from "../../../Components/Loading/Loading";

const Payment = () => {
  const { parcelId } = useParams();
  const axiosSecure = useAxiosSecure();

  const { isLoading, data: parcel } = useQuery({
    queryKey: ["parcels", parcelId],
    queryFn: async () => {
      const res = await axiosSecure.get(`/parcels/${parcelId}`);
      return res.data;
    },
  });

  const handlePayment = async () => {
    if (!parcel) return;

    try {
      const paymentInfo = {
        cost: parcel.cost,
        parcelId: parcel._id,
        senderEmail: parcel.senderEmail,
        parcelTitle: parcel.parcelTitle,
      };

      const res = await axiosSecure.post("/create-checkout-session", paymentInfo);

      // Redirect user to Stripe Checkout
      if (res.data?.url) {
        window.location.href = res.data.url;
      }
    } catch (error) {
      console.error("Payment redirect failed:", error);
    }
  };

  if (isLoading) {
    return <Loading />;
  }

  if (!parcel) {
    return <p className="text-red-500">Parcel information not found.</p>;
  }

  return (
    <div>
      <p>
        Payment <strong>{parcel.cost}</strong> taka for parcel:{" "}
        {parcel.parcelTitle}
      </p>
      <button onClick={handlePayment} className="btn btn-secondary text-white">
        Pay
      </button>
    </div>
  );
};

export default Payment;