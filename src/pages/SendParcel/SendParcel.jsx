import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { FaBoxOpen } from "react-icons/fa";
import ParcelInfo from "./ParcelInfo";
import SenderInfo from "./SenderInfo";
import ReceiverInfo from "./ReceiverInfo";
import { useLoaderData, useNavigate } from "react-router";
import Swal from "sweetalert2";
import useAxiosSecure from "../../Hooks/useAxiosSecure";
import useAuth from "../../Hooks/useAuth";

const SendParcel = () => {
  const serviceArea = useLoaderData();
  const axiosSecure = useAxiosSecure();
  const { user } = useAuth();
  const navigate = useNavigate();
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    reset,
    refetch,
  } = useForm();
  const senderRegion = watch("senderRegion");
  const receiverRegion = watch("receiverRegion");
  const parcelType = watch("parcelType");

  useEffect(() => {
    if (user) {
      reset({
        senderName: user.displayName || "",
        senderEmail: user.email || "",
      });
    }
  }, [user, reset]);

  const handleSendParcelForm = (data) => {
    const isDocument = data.parcelType === "Document";
    const sameDistrict = data.senderArea === data.receiverArea;
    const parcelWeight = Number(data.weight) || 0;

    let cost = 0;
    if (isDocument) {
      cost = sameDistrict ? 60 : 80;
    } else {
      const minCharge = sameDistrict ? 110 : 150;
      if (parcelWeight <= 3) {
        cost = minCharge;
      } else {
        const extraWeight = parcelWeight - 3;
        // 40 taka per additional kg over 3kg
        const extraCharge = extraWeight * 40;
        cost = minCharge + extraCharge;
      }
    }

    const payload = {
      ...data,
      cost,
      parcelStatus: "requested", // Default status for new parcel
      createdAt: new Date(),
    };

    Swal.fire({
      title: `Your total payment is ${cost} taka.`,
      text: "Please confirm to proceed with booking.",
      icon: "info",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      cancelButtonColor: "#d33",
      confirmButtonText: "Yes, Confirm & Proceed",
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          const res = await axiosSecure.post("/parcels", payload);

          if (res.data.insertedId || res.data.acknowledged) {
            Swal.fire({
              title: "Confirmed!",
              text: "Your parcel request has been placed successfully.",
              icon: "success",
              timer: 1500,
              showConfirmButton: false,
            });
            navigate("/dashboard/my-parcels");
          }
        } catch (error) {
          console.error("Error saving parcel:", error);
          Swal.fire({
            title: "Error!",
            text:
              error.response?.data?.message || "Failed to place parcel order.",
            icon: "error",
          });
        }
      }
    });
  };

  return (
    <div className=" mx-auto p-2">
      {/* Header */}
      <div className="bg-primary rounded-t-2xl p-8">
        <div className="flex items-center gap-4">
          <div className="bg-secondary text-white p-4 rounded-full">
            <FaBoxOpen size={24} />
          </div>

          <div>
            <h2 className="text-3xl font-bold text-secondary">Send a Parcel</h2>
            <p className="text-gray-600 mt-1">
              Door to door delivery made easy
            </p>
          </div>
        </div>
      </div>

      {/* Form */}
      <form
        onSubmit={handleSubmit(handleSendParcelForm)}
        className=" space-y-6 mt-6"
      >
        <ParcelInfo
          register={register}
          errors={errors}
          parcelType={parcelType}
        />
        <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
          <SenderInfo
            register={register}
            errors={errors}
            serviceArea={serviceArea}
            senderRegion={senderRegion}
            user={user}
          />
          <ReceiverInfo
            register={register}
            errors={errors}
            serviceArea={serviceArea}
            receiverRegion={receiverRegion}
          />
        </div>

        <button className="btn btn-secondary w-full text-white">
          Continue
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
