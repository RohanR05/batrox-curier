import React from "react";

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
  console.log(district);

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
              {...register("receiverContect", {
                required: "Receiver Contect is required",
              })}
            />

            {errors.receiverContect && (
              <p className="text-error text-sm mt-1">
                {errors.receiverContect.message}
              </p>
            )}
          </div>

          {/* Receiver region */}
          <div>
            <select
              defaultValue=""
              {...register("receiverRegion", {
                required: "Please select a Delevary area",
              })}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select Delevary Region
              </option>
              {areas.map((r, index) => (
                <option value={r} key={index}>
                  {r}
                </option>
              ))}
            </select>

            {errors.delevaryRegion && (
              <p className="text-red-500 text-sm mt-1">
                {errors.delevaryRegion.message}
              </p>
            )}
          </div>

          {/* Receiver Area */}
          <div>
            <select
              defaultValue=""
              {...register("serviceArea", {
                required: "Please select a Delevary area",
              })}
              className="select select-bordered w-full"
            >
              <option value="" disabled>
                Select Delevary Region
              </option>
              {district.map((r, index) => (
                <option value={r} key={index}>
                  {r}
                </option>
              ))}
            </select>

            {errors.delevaryRegion && (
              <p className="text-red-500 text-sm mt-1">
                {errors.delevaryRegion.message}
              </p>
            )}
          </div>

          {/* Receiver Address */}
          <div className="">
            <label className="label font-medium">Receiver Address</label>

            <textarea
              rows={3}
              className="textarea textarea-bordered w-full"
              placeholder="Enter Delevary address"
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
