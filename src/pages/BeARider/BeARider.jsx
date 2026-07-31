import React from "react";
import { useForm } from "react-hook-form";
import { FaLock } from "react-icons/fa";

const BeARider = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const handleRiderForm = (data) => {
    console.log(data);
  };

  return (
    <div>
      <h2>Rider Form</h2>
      <form onSubmit={handleSubmit(handleRiderForm)}>
        {/* Name */}
        <div>
          <label className="label font-semibold text-secondary">Name</label>

          <label className="input input-bordered flex items-center gap-3">
            <FaLock className="text-secondary" />
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
        <div>
          <label className="label font-semibold text-secondary">Name</label>

          <label className="input input-bordered flex items-center gap-3">
            <FaLock className="text-secondary" />
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
        <div>
          <label className="label font-semibold text-secondary">Name</label>

          <label className="input input-bordered flex items-center gap-3">
            <FaLock className="text-secondary" />
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
        <div>
          <label className="label font-semibold text-secondary">Name</label>

          <label className="input input-bordered flex items-center gap-3">
            <FaLock className="text-secondary" />
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
        <div>
          <label className="label font-semibold text-secondary">Name</label>

          <label className="input input-bordered flex items-center gap-3">
            <FaLock className="text-secondary" />
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
        <input type="submit" />
      </form>
    </div>
  );
};

export default BeARider;
