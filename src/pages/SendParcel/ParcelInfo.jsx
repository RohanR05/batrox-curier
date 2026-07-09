import React from "react";
import { FaFileAlt } from "react-icons/fa";

const ParcelInfo = ({ register, errors, watch }) => {
  const parcelType = watch("parcelType");
  return (
    <div className="border p-8 rounded-2xl shadow border-secondary">
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
          <p className="text-error text-sm mt-2">{errors.parcelType.message}</p>
        )}
      </div>
      {/* Parcel Title */}
      <div className="flex items-center flex-wrap mt-4 gap-3">
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
            <p className="text-error text-sm mt-2">{errors.name.message}</p>
          )}
        </div>
        <div className="ml-0 md:ml-8">
          {parcelType === "Non Document" && (
            <div className="">
              <label className="label">
                <span className="text-secondary font-medium">Weight (kg)</span>
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
    </div>
  );
};

export default ParcelInfo;
