import React from "react";
import { useForm } from "react-hook-form";
import { FaBoxOpen, FaFileAlt } from "react-icons/fa";

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
    <div className="">
      <div className=" mx-auto">
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
          className=" space-y-6"
        >
          <main className="border p-8 rounded-2xl shadow border-secondary">
            {" "}
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
            {/* Parcel Title */}
            <div className="flex items-center flex-wrap mt-4">
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
              <div className="ml-8">
                {parcelType === "Non Document" && (
                  <div className="">
                    <label className="label">
                      <span className="text-secondary font-medium">
                        Weight (kg)
                      </span>
                    </label>

                    <input
                      type="number"
                      step="0.1"
                      placeholder="Enter parcel weight"
                      {...register("weight", {
                        required: "Weight is required for non-document parcels",
                        min: {
                          value: 0.1,
                          message: "Weight must be greater than 0",
                        },
                      })}
                      className="input input-bordered w-full"
                    />

                    {errors.weight && (
                      <p className="text-red-500 text-sm mt-1">
                        {errors.weight.message}
                      </p>
                    )}
                  </div>
                )}
              </div>
            </div>
          </main>
          {/* sender info */}
          <main className="border rounded-2xl shadow border-secondary">
            {/* Sender Information */}
            <div className="border border-primary/20 rounded-xl p-6">
              <h3 className="text-2xl font-bold text-secondary mb-6">
                Sender Information
              </h3>

              <div className="gap-5">
                {/* Sender Name */}
                <div>
                  <label className="label font-medium">Sender Name</label>
                  <input
                    type="text"
                    className="input input-bordered w-full"
                    placeholder="Enter sender name"
                    {...register("senderName", {
                      required: "Sender name is required",
                    })}
                  />

                  {errors.senderName && (
                    <p className="text-error text-sm mt-1">
                      {errors.senderName.message}
                    </p>
                  )}
                </div>

                {/* Sender Email */}
                <div>
                  <label className="label font-medium">Sender Email</label>
                  <input
                    type="email"
                    className="input input-bordered w-full"
                    placeholder="Enter sender email"
                    {...register("senderEmail", {
                      required: "Sender email is required",
                    })}
                  />

                  {errors.senderEmail && (
                    <p className="text-error text-sm mt-1">
                      {errors.senderEmail.message}
                    </p>
                  )}
                </div>

                {/* Sender Phone */}
                <div>
                  <label className="label font-medium">Phone Number</label>
                  <input
                    type="tel"
                    className="input input-bordered w-full"
                    placeholder="Enter phone number"
                    {...register("senderPhone", {
                      required: "Phone number is required",
                    })}
                  />

                  {errors.senderPhone && (
                    <p className="text-error text-sm mt-1">
                      {errors.senderPhone.message}
                    </p>
                  )}
                </div>

                {/* Pickup Area */}
                <div>
                  <label className="label font-medium">Pickup Area</label>

                  <div className="space-y-2 mt-2">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="Inside City"
                        className="radio radio-secondary"
                        {...register("senderArea", {
                          required: "Select pickup area",
                        })}
                      />
                      <span>Inside City</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="Outside City"
                        className="radio radio-secondary"
                        {...register("senderArea", {
                          required: "Select pickup area",
                        })}
                      />
                      <span>Outside City</span>
                    </label>

                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        value="Remote Area"
                        className="radio radio-secondary"
                        {...register("senderArea", {
                          required: "Select pickup area",
                        })}
                      />
                      <span>Remote Area</span>
                    </label>
                  </div>

                  {errors.senderArea && (
                    <p className="text-error text-sm mt-1">
                      {errors.senderArea.message}
                    </p>
                  )}
                </div>

                {/* Sender Address */}
                <div className="">
                  <label className="label font-medium">Pickup Address</label>

                  <textarea
                    rows={3}
                    className="textarea textarea-bordered w-full"
                    placeholder="Enter pickup address"
                    {...register("senderAddress", {
                      required: "Pickup address is required",
                    })}
                  />

                  {errors.senderAddress && (
                    <p className="text-error text-sm mt-1">
                      {errors.senderAddress.message}
                    </p>
                  )}
                </div>
              </div>
            </div>
          </main>
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
