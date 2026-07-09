import React from "react";

const SenderInfo = ({ register, errors }) => {
  return (
    <div>
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
    </div>
  );
};

export default SenderInfo;
