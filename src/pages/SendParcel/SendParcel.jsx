import React from "react";
import { useForm } from "react-hook-form";

const SendParcel = () => {
  const {
    register,
    handleSubmit,
    formState: { error },
  } = useForm();
  const handleSendParcelForm = (data) => {
    console.log(data);
  };
  return (
    <div>
      {/* heading */}
      <div>
        <h2>Send Parcel</h2>
        <p>Door to door delivery made easy</p>
      </div>
      {/* total form */}
      <form onSubmit={handleSubmit(handleSendParcelForm)}>
        <div className="bg-primary text-black">
          <input type="text" name="Title" id="" placeholder="Parcel Title" />
        </div>
      </form>
    </div>
  );
};

export default SendParcel;
