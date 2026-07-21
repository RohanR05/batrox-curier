import React from "react";
import { Link } from "react-router";

const PaymentCancelled = () => {
  return (
    <div>
      <h2>Payment Cancelled</h2>
      <Link to={"/dashBoard/my-parcels"}>
        <button className="btn btn-primary text-black">Try again</button>
      </Link>
    </div>
  );
};

export default PaymentCancelled;
