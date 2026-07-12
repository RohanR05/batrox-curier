import React from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaGlobeAsia,
  FaMapMarkerAlt,
  FaHome,
} from "react-icons/fa";

const SenderInfo = ({ register, errors, serviceArea, senderRegion }) => {
  const duplicateRegion = serviceArea.map((c) => c.region);
  const regions = [...new Set(duplicateRegion)];

  const districts = [
    ...new Set(
      serviceArea
        .filter((item) => item.region === senderRegion)
        .map((item) => item.district),
    ),
  ];

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

            <label className="input input-bordered flex items-center gap-2 w-full">
              <FaUser className="text-secondary" />
              <input
                type="text"
                className="grow"
                placeholder="Enter sender name"
                {...register("senderName", {
                  required: "Sender name is required",
                })}
              />
            </label>

            {errors.senderName && (
              <p className="text-error text-sm mt-1">
                {errors.senderName.message}
              </p>
            )}
          </div>

          {/* Sender Contact */}
          <div>
            <label className="label font-medium">Sender Contact</label>

            <label className="input input-bordered flex items-center gap-2 w-full">
              <FaPhoneAlt className="text-secondary" />
              <input
                type="text"
                className="grow"
                placeholder="Enter sender contact"
                {...register("senderContect", {
                  required: "Sender Contact is required",
                })}
              />
            </label>

            {errors.senderContect && (
              <p className="text-error text-sm mt-1">
                {errors.senderContect.message}
              </p>
            )}
          </div>

          {/* Pickup Region */}
          <div>
            <label className="label font-medium">Pickup Region</label>

            <label className="select select-bordered flex items-center gap-2 w-full">
              <FaGlobeAsia className="text-secondary" />

              <select
                className="grow"
                defaultValue=""
                {...register("senderRegion", {
                  required: "Please select a pickup region",
                })}
              >
                <option value="" disabled>
                  Select Pickup Region
                </option>

                {regions.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>

            {errors.senderRegion && (
              <p className="text-error text-sm mt-1">
                {errors.senderRegion.message}
              </p>
            )}
          </div>

          {/* Pickup District */}
          <div>
            <label className="label font-medium">Pickup District</label>

            <label className="select select-bordered flex items-center gap-2 w-full">
              <FaMapMarkerAlt className="text-secondary" />

              <select
                className="grow"
                defaultValue=""
                {...register("senderArea", {
                  required: "Please select a pickup district",
                })}
              >
                <option value="" disabled>
                  Select Pickup District
                </option>

                {districts.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>

            {errors.senderArea && (
              <p className="text-error text-sm mt-1">
                {errors.senderArea.message}
              </p>
            )}
          </div>

          {/* Pickup Address */}
          <div>
            <label className="label font-medium">Pickup Address</label>

            <label className="textarea textarea-bordered flex gap-2 w-full">
              <FaHome className="text-secondary mt-1" />

              <textarea
                rows={3}
                className="grow resize-none"
                placeholder="Enter pickup address"
                {...register("senderAddress", {
                  required: "Pickup address is required",
                })}
              />
            </label>

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
