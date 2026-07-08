import React from "react";
import { useForm } from "react-hook-form";
import { FaBoxOpen, FaFileAlt } from "react-icons/fa";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleSendParcelForm = (data) => {
    console.log(data);
  };

  return (
    <div className="">
      <div className=" mx-auto bg-base-100 rounded-2xl shadow-xl border border-primary/20">
        {/* Header */}
        <div className="bg-primary rounded-t-2xl p-8">
          <div className="flex items-center gap-4">
            <div className="bg-secondary text-white p-4 rounded-full">
              <FaBoxOpen size={24} />
            </div>

            <div>
              <h2 className="text-3xl font-bold text-secondary">
                Send a Parcel
              </h2>
              <p className="text-gray-600 mt-1">
                Door to door delivery made easy
              </p>
            </div>
          </div>
        </div>

        {/* Form */}
        <form
          onSubmit={handleSubmit(handleSendParcelForm)}
          className="p-8 space-y-6"
        >
          {/* Parcel Title */}
          <div>
            <label className="label font-semibold text-secondary">
              Parcel Title
            </label>

            <label className="input input-bordered flex items-center gap-3">
              <FaFileAlt className="text-secondary" />
              <input
                type="text"
                className="grow"
                placeholder="Enter parcel title"
                {...register("name", {
                  required: "Parcel title is required",
                })}
              />
            </label>

            {errors.name && (
              <p className="text-error text-sm mt-2">
                {errors.name.message}
              </p>
            )}
          </div>

          {/* Parcel Type */}
          <div>
            <label className="label font-semibold text-secondary mb-2">
              Parcel Type
            </label>

            <div className="grid md:grid-cols-2 gap-4">
              <label className="border rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-secondary">
                <input
                  type="radio"
                  value="Document"
                  {...register("parcelType", {
                    required: "Please select a parcel type",
                  })}
                  className="radio radio-secondary"
                />

                <span className="font-medium">Document</span>
              </label>

              <label className="border rounded-xl p-4 flex items-center gap-3 cursor-pointer hover:border-secondary">
                <input
                  type="radio"
                  value="Non Document"
                  {...register("parcelType", {
                    required: "Please select a parcel type",
                  })}
                  className="radio radio-secondary"
                />

                <span className="font-medium">Non Document</span>
              </label>
            </div>

            {errors.parcelType && (
              <p className="text-error text-sm mt-2">
                {errors.parcelType.message}
              </p>
            )}
          </div>

          {/* Submit */}
          <button className="btn btn-secondary w-full text-white">
            Continue
          </button>
        </form>
      </div>
    </div>
  );
};

export default SendParcel;