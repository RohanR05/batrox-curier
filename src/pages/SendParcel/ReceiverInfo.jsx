import React from "react";

const ReceiverInfo = ({ register, errors }) => {
  return (
    <div className="border rounded-2xl shadow border-secondary">
      {/* Receiver Information */}
      <div className="border border-primary/20 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-secondary mb-6">
          Receiver Information
        </h3>

        <div className="gap-5">
          {/* Receiver Name */}
          <div>
            <label className="label font-medium">Receiver Name</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter receiver name"
              {...register("receiverName", {
                required: "Receiver name is required",
              })}
            />

            {errors.receiverName && (
              <p className="text-error text-sm mt-1">
                {errors.receiverName.message}
              </p>
            )}
          </div>

          {/* Receiver Contect */}
          <div>
            <label className="label font-medium">Receiver Contect</label>
            <input
              type="text"
              className="input input-bordered w-full"
              placeholder="Enter receiver Contect"
              {...register("senderContect", {
                required: "Receiver Contect is required",
              })}
            />

            {errors.senderContect && (
              <p className="text-error text-sm mt-1">
                {errors.senderContect.message}
              </p>
            )}
          </div>

          {/* Receiver Area */}
          <div>
            <label className="label font-medium">Receiver Area</label>

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

          {/* Receiver Address */}
          <div className="">
            <label className="label font-medium">Receiver Address</label>

            <textarea
              rows={3}
              className="textarea textarea-bordered w-full"
              placeholder="Enter pickup address"
              {...register("receiverAddress", {
                required: "Receiver address is required",
              })}
            />

            {errors.receiverAddress && (
              <p className="text-error text-sm mt-1">
                {errors.receiverAddress.message}
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReceiverInfo;
