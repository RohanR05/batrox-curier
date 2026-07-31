import React from "react";
import { useForm } from "react-hook-form";
import { BsPassport } from "react-icons/bs";
import { FaLock, FaRegAddressCard } from "react-icons/fa";
import {
  MdAppRegistration,
  MdDriveFileRenameOutline,
  MdEmail,
  MdLocationOn,
  MdMap,
} from "react-icons/md";
import { RiEBike2Fill } from "react-icons/ri";
import { useLoaderData } from "react-router";

const BeARider = () => {
  const {
    handleSubmit,
    register,
    watch,
    formState: { errors },
  } = useForm();

  const areaData = useLoaderData() ?? [];

  const riderRegion = watch("riderRegion");

  const duplicateRegion = areaData.map((c) => c.region);
  const regions = [...new Set(duplicateRegion)];
  const districts = riderRegion
    ? [
        ...new Set(
          areaData
            .filter((c) => c.region === riderRegion)
            .map((r) => r.district),
        ),
      ]
    : [];

  console.log({ regions, riderRegion, districts });

  const handleRiderForm = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2 className="text-3xl font-semibold italic text-secondary text-center my-4">
        Rider Form
      </h2>
      {/* be a rider form */}
      <form onSubmit={handleSubmit(handleRiderForm)}>
        {/* total form */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 border-2 rounded-2xl p-4 py-6 border-secondary bg-primary/50">
          {/* rider details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-secondary">
              Rider Details
            </h2>{" "}
            {/* Name */}
            <div>
              <label className="label font-semibold text-secondary">Name</label>

              <label className="input input-bordered flex items-center gap-3 w-full">
                <MdDriveFileRenameOutline className="text-secondary text-xl" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter your name"
                  {...register("name", {
                    required: "Name is required",
                  })}
                />
              </label>

              {errors.name && (
                <p className="text-error text-sm mt-1">{errors.name.message}</p>
              )}
            </div>
            {/* email */}
            <div>
              <label className="label font-semibold text-secondary">
                Email
              </label>

              <label className="input input-bordered flex items-center gap-3 w-full">
                <MdEmail className="text-secondary text-xl" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter your email"
                  {...register("email", {
                    required: "Email is required",
                  })}
                />
              </label>

              {errors.email && (
                <p className="text-error text-sm mt-1">
                  {errors.email.message}
                </p>
              )}
            </div>
            {/* region */}
            <div>
              <label className="label font-semibold text-secondary">
                Region
              </label>

              <label className="input input-bordered flex items-center gap-3 w-full">
                <MdLocationOn className="text-secondary text-xl shrink-0" />
                <select
                  className="grow bg-transparent focus:outline-none cursor-pointer"
                  defaultValue=""
                  {...register("riderRegion", {
                    required: "Please select a pickup region",
                  })}
                >
                  <option value="" disabled>
                    Select Pickup Region
                  </option>

                  {regions?.map((r, index) => (
                    <option key={index} value={r}>
                      {r}
                    </option>
                  ))}
                </select>
              </label>

              {errors.riderRegion && (
                <p className="text-error text-sm mt-1">
                  {errors.riderRegion.message}
                </p>
              )}
            </div>
            {/* district */}
            <div>
              <label className="label font-semibold text-secondary">
                District
              </label>

              <label className="input input-bordered flex items-center gap-3 w-full">
                <MdMap className="text-secondary text-xl shrink-0" />
                <select
                  className="grow bg-transparent focus:outline-none cursor-pointer"
                  defaultValue=""
                  {...register("riderDistrict", {
                    required: "Please select a district",
                  })}
                >
                  <option value="" disabled>
                    Select Pickup District
                  </option>

                  {districts?.map((d, index) => (
                    <option key={index} value={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>

              {errors.riderDistrict && (
                <p className="text-error text-sm mt-1">
                  {errors.riderDistrict.message}
                </p>
              )}
            </div>
          </div>
          {/* more details */}
          <div className="space-y-4">
            <h2 className="text-2xl font-semibold text-secondary">
              More details
            </h2>
            {/* NID */}
            <div>
              <label className="label font-semibold text-secondary">
                Rider NID
              </label>

              <label className="input input-bordered flex items-center gap-3 w-full">
                <BsPassport className="text-secondary text-xl" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter your NID"
                  {...register("nid", {
                    required: "NID is required",
                  })}
                />
              </label>

              {errors.nid && (
                <p className="text-error text-sm mt-1">{errors.nid.message}</p>
              )}
            </div>
            {/* Bike Name */}
            <div>
              <label className="label font-semibold text-secondary">
                Bike Name
              </label>

              <label className="input input-bordered flex items-center gap-3 w-full">
                <RiEBike2Fill className="text-secondary text-xl" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter your Bike name"
                  {...register("bike", {
                    required: "Bike Name is required",
                  })}
                />
              </label>

              {errors.bike && (
                <p className="text-error text-sm mt-1">{errors.bike.message}</p>
              )}
            </div>
            {/*Driving Licanse*/}
            <div>
              <label className="label font-semibold text-secondary">
                Driving License
              </label>

              <label className="input input-bordered flex items-center gap-3 w-full">
                <MdAppRegistration className="text-secondary text-xl" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter your Driving license"
                  {...register("license", {
                    required: "License is required",
                  })}
                />
              </label>

              {errors.license && (
                <p className="text-error text-sm mt-1">
                  {errors.license.message}
                </p>
              )}
            </div>{" "}
            {/* address */}
            <div>
              <label className="label font-semibold text-secondary">
                Address
              </label>

              <label className="input input-bordered flex items-center gap-3 w-full">
                <FaRegAddressCard className="text-secondary text-xl" />
                <input
                  type="text"
                  className="grow"
                  placeholder="Enter your address"
                  {...register("address", {
                    required: "Address is required",
                  })}
                />
              </label>

              {errors.address && (
                <p className="text-error text-sm mt-1">
                  {errors.address.message}
                </p>
              )}
            </div>
          </div>{" "}
        </div>

        {/* submit */}
        <input
          type="submit"
          className="btn btn-secondary btn-outline w-full mt-4 rounded-2xl bg-primary hover:text-primary hover:bg-secondary"
        />
      </form>
    </div>
  );
};

export default BeARider;
