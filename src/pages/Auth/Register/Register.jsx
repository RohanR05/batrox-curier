import React from "react";
import { useForm } from "react-hook-form";
import { NavLink } from "react-router";
import { FaEnvelope, FaLock, FaUserPlus } from "react-icons/fa";
import useAuth from "../../../Hooks/useAuth";
import GoogleSignIn from "../GoogleSignIn/GoogleSignIn";
import axios from "axios";

const Register = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { registerUser, updateUserProfile } = useAuth();

  const handleRegisterForm = (data) => {
    const profileImg = data.photo[0];

    registerUser(data.email, data.password)
      .then((result) => {
        console.log(result.user);

        const formData = new FormData();
        formData.append("image", profileImg);
        const image_api_url = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMGBB_apikey}`;

        axios.post(image_api_url, formData).then((res) => {
          console.log(res.data.data.url);

          const userProfile = {
            displayName: data.name,
            photoURL: res.data.data.url,
          };
          updateUserProfile(userProfile)
            .then((res) => {
              console.log("update success");
            })
            .catch((error) => {
              console.log(error);
            });
        });
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-base-200 px-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl border border-primary/20">
        <div className="card-body">
          <div className="flex flex-col items-center mb-6">
            <div className="bg-primary text-secondary p-4 rounded-full">
              <FaUserPlus size={24} />
            </div>

            <h2 className="text-3xl font-bold mt-4 text-secondary">
              Create Account
            </h2>

            <p className="text-sm text-gray-500 mt-2">Register to continue</p>
          </div>

          <form
            onSubmit={handleSubmit(handleRegisterForm)}
            className="space-y-5"
          >
            {/* name */}
            <div>
              <label className="label font-medium">Name</label>

              <label className="input input-bordered flex items-center gap-2">
                <FaEnvelope className="text-secondary" />
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
            </div>{" "}
            {/* Email */}
            <div>
              <label className="label font-medium">Email</label>

              <label className="input input-bordered flex items-center gap-2">
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
            {/* photo */}
            <div>
              <label className="label font-medium">Photo</label>

              <label className="input input-bordered flex items-center gap-2">
                <FaEnvelope className="text-secondary" />
                <input
                  type="file"
                  className="file-input-ghost"
                  className="grow"
                  placeholder="Enter your photo"
                  {...register("photo", {
                    required: "Email is required",
                  })}
                />
              </label>

              {errors.photo && (
                <p className="text-error text-sm mt-1">
                  {errors.photo.message}
                </p>
              )}
            </div>
            {/* password */}
            <div>
              <label className="label font-medium">Password</label>

              <label className="input input-bordered flex items-center gap-2">
                <FaLock className="text-secondary" />
                <input
                  type="password"
                  className="grow"
                  placeholder="Enter password"
                  {...register("password", {
                    required: "Password is required",
                    minLength: {
                      value: 6,
                      message: "Password must be at least 6 characters",
                    },
                    pattern: {
                      value: /^[A-Za-z]+$/,
                      message: "Password must contain only letters",
                    },
                  })}
                />
              </label>

              {errors.password && (
                <p className="text-error text-sm mt-1">
                  {errors.password.message}
                </p>
              )}
            </div>
            <button className="btn btn-secondary w-full">Create Account</button>
          </form>

          <div className="divider">OR</div>
          <GoogleSignIn></GoogleSignIn>

          <div className="flex justify-between text-sm">
            <NavLink
              to="/login"
              className="text-secondary hover:text-black font-medium"
            >
              Login
            </NavLink>

            <NavLink
              to="/"
              className="text-secondary hover:text-black font-medium"
            >
              Home
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
