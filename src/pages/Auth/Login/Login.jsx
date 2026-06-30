import React from "react";
import { useForm } from "react-hook-form";
import { FaEnvelope, FaLock, FaSignInAlt } from "react-icons/fa";
import { NavLink } from "react-router";

const Login = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const handleLoginForm = (data) => {
    console.log(data);
  };

  return (
    <div className="min-h-screen bg-primary flex items-center justify-center px-4">
      <div className="card w-full max-w-md bg-info shadow-2xl">
        <div className="card-body p-8">
          {/* Header */}
          <div className="flex flex-col items-center mb-8">
            <div className="w-16 h-16 rounded-full bg-secondary text-white flex items-center justify-center">
              <FaSignInAlt size={24} />
            </div>

            <h1 className="text-3xl font-bold text-secondary mt-4">
              Welcome Back
            </h1>

            <p className="text-gray-500 mt-2 text-center">
              Login to continue to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit(handleLoginForm)} className="space-y-5">
            {/* Email */}
            <div>
              <label className="label font-semibold text-secondary">
                Email
              </label>

              <label className="input input-bordered flex items-center gap-3">
                <FaEnvelope className="text-secondary" />
                <input
                  type="email"
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

            {/* Password */}
            <div>
              <label className="label font-semibold text-secondary">
                Password
              </label>

              <label className="input input-bordered flex items-center gap-3">
                <FaLock className="text-secondary" />
                <input
                  type="password"
                  className="grow"
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
              </label>

              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>

            <div className="text-right">
              <p className="text-secondary text-sm">
                Go back{" "}
                <strong>
                  <NavLink className={"underline"} to={"/"}>
                    Home
                  </NavLink>
                </strong>
              </p>
            </div>

            <button className="btn btn-secondary w-full text-white">
              Login
            </button>
          </form>

          <div className="divider">OR</div>

          <p className="text-center text-sm">
            Don't have an account?{" "}
            <NavLink
              to="/register"
              className="text-secondary font-semibold hover:underline"
            >
              Register
            </NavLink>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
