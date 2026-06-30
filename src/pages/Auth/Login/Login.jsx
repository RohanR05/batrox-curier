import React from "react";
import { useForm } from "react-hook-form";

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
    <div>
      <form onSubmit={handleSubmit(handleLoginForm)} className="fieldset">
        <label className="label">Email</label>
        <input
          type="email"
          className="input"
          placeholder="Email"
          {...register("email", { required: "Email Field Empty" })}
        />
        <label className="label">Password</label>
        <input
          type="password"
          className="input"
          {...register("password", { required: "Password field Empty" })}
          placeholder="Password"
        />
        {errors.password && <p>{errors.password.message}</p>}
        <div>
          <a className="link link-hover">Forgot password?</a>
        </div>
        <button className="btn btn-neutral mt-4">Login</button>
      </form>
    </div>
  );
};

export default Login;
