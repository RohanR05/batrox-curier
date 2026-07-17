import React from "react";
import {
  FaUser,
  FaPhoneAlt,
  FaGlobeAsia,
  FaMapMarkerAlt,
  FaHome,
} from "react-icons/fa";

const ReceiverInfo = ({ register, errors, receiverRegion, serviceArea }) => {
  const dupicateAreas = serviceArea.map((r) => r.region);
  const areas = [...new Set(dupicateAreas)];

  const district = [
    ...new Set(
      serviceArea
        .filter((c) => c.region === receiverRegion)
        .map((r) => r.district),
    ),
  ];

  return (
    <div className="border rounded-2xl shadow border-secondary">
      {/* Receiver Information */}
      <div className="border border-primary/20 rounded-xl p-6">
        <h3 className="text-2xl font-bold text-secondary mb-6">
          Receiver Information
        </h3>

        <div className="space-y-3">
          {/* Receiver Name */}
          <div>
            <label className="label font-medium">Receiver Name</label>

            <label className="input input-bordered flex items-center gap-2 w-full">
              <FaUser className="text-secondary" />
              <input
                type="text"
                className="grow"
                placeholder="Enter receiver name"
                {...register("receiverName", {
                  required: "Receiver name is required",
                })}
              />
            </label>

            {errors.receiverName && (
              <p className="text-error text-sm mt-1">
                {errors.receiverName.message}
              </p>
            )}
          </div>

          {/* Receiver Email */}
          <div>
            <label className="label font-medium">Receiver Email</label>

            <label className="input input-bordered flex items-center gap-2 w-full">
              <FaPhoneAlt className="text-secondary" />
              <input
                type="text"
                className="grow"
                placeholder="Enter receiver Email"
                {...register("receiverEmail", {
                  required: "Receiver Email is required",
                })}
              />
            </label>

            {errors.receiverEmail && (
              <p className="text-error text-sm mt-1">
                {errors.receiverEmail.message}
              </p>
            )}
          </div>

          {/* Delivery Region */}
          <div>
            <label className="label font-medium">Delivery Region</label>

            <label className="select select-bordered flex items-center gap-2 w-full">
              <FaGlobeAsia className="text-secondary" />

              <select
                className="grow"
                defaultValue=""
                {...register("receiverRegion", {
                  required: "Please select a delivery region",
                })}
              >
                <option value="" disabled>
                  Select Delivery Region
                </option>

                {areas.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>

            {errors.receiverRegion && (
              <p className="text-error text-sm mt-1">
                {errors.receiverRegion.message}
              </p>
            )}
          </div>

          {/* Delivery District */}
          <div>
            <label className="label font-medium">Delivery District</label>

            <label className="select select-bordered flex items-center gap-2 w-full">
              <FaMapMarkerAlt className="text-secondary" />

              <select
                className="grow"
                defaultValue=""
                {...register("receiverArea", {
                  required: "Please select a delivery district",
                })}
              >
                <option value="" disabled>
                  Select Delivery District
                </option>

                {district.map((r, index) => (
                  <option key={index} value={r}>
                    {r}
                  </option>
                ))}
              </select>
            </label>

            {errors.receiverArea && (
              <p className="text-error text-sm mt-1">
                {errors.receiverArea.message}
              </p>
            )}
          </div>

          {/* Receiver Address */}
          <div>
            <label className="label font-medium">Receiver Address</label>

            <label className="textarea textarea-bordered flex gap-2 w-full">
              <FaHome className="text-secondary mt-1" />

              <textarea
                rows={3}
                className="grow resize-none"
                placeholder="Enter delivery address"
                {...register("receiverAddress", {
                  required: "Receiver address is required",
                })}
              />
            </label>

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
