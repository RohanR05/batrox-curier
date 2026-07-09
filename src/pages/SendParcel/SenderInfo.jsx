import React from "react";

const SenderInfo = ({ register, errors }) => {
  return (
    <div className="border rounded-2xl shadow border-secondary">
      {/* Sender Information */}
      <div className="border border-primary/20 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-secondary mb-6">
          Sender Information
        </h3>

        <div className="space-y-3">
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

          {/* Sender Contect */}
          <div>
            <label className="label font-medium">Sender Contect</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter sender Contect"
              {...register("senderContect", {
                required: "Sender Contect is required",
              })}
            />

            {errors.senderContect && (
              <p className="text-error text-sm mt-1">
                {errors.senderContect.message}
              </p>
            )}
          </div>

          {/* Pickup Area */}
          <div>
            <select
              defaultValue=""
              {...register("pickupArea", {
                required: "Please select a pickup area",
              })}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select Pickup Area
              </option>
              <option value="Dhaka">Dhaka</option>
              <option value="Chattogram">Chattogram</option>
              <option value="Khulna">Khulna</option>
            </select>

            {errors.pickupArea && (
              <p className="text-red-500 text-sm mt-1">
                {errors.pickupArea.message}
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
    </div>
  );
};

export default SenderInfo;
