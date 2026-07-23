import React, { useEffect, useRef, useState } from "react";
import { useSearchParams } from "react-router";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";

const PaymentSuccess = () => {
  const [searchParams] = useSearchParams();
  const sessionId = searchParams.get("session_id");
  const axiosSecure = useAxiosSecure();
  const [paymentInfo, setPaymentInfo] = useState({});
  const isExecuted = useRef(false);

  useEffect(() => {
    if (sessionId && !isExecuted.current) {
      isExecuted.current = true;
      axiosSecure
        .patch(`payment-success?session_id=${sessionId}`)
        .then((res) => {
          console.log(res.data);
          setPaymentInfo({
            transactionId: res.data.transactionId,
            trackingId: res.data.trackingId,
          });
        })
        .catch((err) => {
          console.error("payment sync error:", err);
        });
    }
  }, [sessionId, axiosSecure]);
  return (
    <div>
      Payment Success
      <div>
        <p>Transaction Id : {paymentInfo.transactionId}</p>
        <p>Tracking ID : {paymentInfo.trackingId}</p>
      </div>
    </div>
  );
};

export default PaymentSuccess;
