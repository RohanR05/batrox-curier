import React from "react";
import { useForm } from "react-hook-form";
import { FaBoxOpen, FaFileAlt } from "react-icons/fa";
import ParcelInfo from "./ParcelInfo";
import SenderInfo from "./SenderInfo";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
  } = useForm();
  const parcelType = watch("parcelType");

  const handleSendParcelForm = (data) => {
    console.log(data);
  };

  return (
    <div className=" mx-auto">
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
        className=" space-y-6"
      >
        <ParcelInfo
          register={register}
          errors={errors}
          watch={watch}
        ></ParcelInfo>
        <SenderInfo register={register} errors={errors}></SenderInfo>
        <button className="btn btn-secondary w-full text-white">
          Continue
        </button>
      </form>
    </div>
  );
};

export default SendParcel;
