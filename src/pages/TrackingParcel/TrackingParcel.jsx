import React from "react";
import { useNavigate, useParams } from "react-router";
import useAxios from "../../Hooks/useAxios";
import { useQuery } from "@tanstack/react-query";

const TrackingParcel = () => {
  const { trackingId } = useParams();
  const axiosInstance = useAxios();
  const navigate = useNavigate();

  const {
    data: trackings = [],
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["tracking", trackingId],
    enabled: !!trackingId,
    queryFn: async () => {
      const res = await axiosInstance.get(`/trackings/${trackingId}/logs`);
      return res.data;
    },
  });

  if (!trackingId) {
    return <p className="text-center py-10">No tracking ID provided.</p>;
  }

  return (
    <div className="max-w-2xl mx-auto px-4 py-8">
      {/* Back button */}
      <button
        onClick={() => navigate(-1)}
        className="btn btn-outline btn-secondary btn-sm mb-6"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
          fill="currentColor"
          className="h-4 w-4"
        >
          <path
            fillRule="evenodd"
            d="M17 10a.75.75 0 01-.75.75H5.612l4.158 3.96a.75.75 0 01-1.04 1.08l-5.5-5.25a.75.75 0 010-1.08l5.5-5.25a.75.75 0 111.04 1.08L5.612 9.25H16.25A.75.75 0 0117 10z"
            clipRule="evenodd"
          />
        </svg>
        Back
      </button>

      {/* Header */}
      <div className="mb-8 text-secondary">
        <p className="text-sm text-gray-500 mb-1">Tracking Number</p>
        <h2 className="text-2xl font-bold">{trackingId}</h2>
        {trackings.length > 0 && (
          <div className="badge badge-secondary badge-lg mt-2 capitalize">
            {trackings[trackings.length - 1]?.status?.replaceAll("-", " ")}
          </div>
        )}
      </div>

      {/* Content states */}
      {isLoading && (
        <div className="flex justify-center py-10">
          <span className="loading loading-spinner loading-lg"></span>
        </div>
      )}

      {isError && (
        <p className="text-center py-10 text-red-500">
          Failed to load tracking logs. Please try again.
        </p>
      )}

      {!isLoading && !isError && trackings.length === 0 && (
        <p className="text-center py-6 text-gray-500">
          No tracking history found yet.
        </p>
      )}

      {!isLoading && !isError && trackings.length > 0 && (
        <ul className="timeline timeline-vertical">
          {trackings.map((log, index) => (
            <li key={log._id || index}>
              {index !== 0 && <hr className="bg-primary" />}

              <div
                className={`timeline-box ${
                  index % 2 === 0 ? "timeline-start" : "timeline-end"
                }`}
              >
                <p className="font-semibold  text-secondary capitalize">
                  {log.status?.replaceAll("-", " ")}
                </p>
                <p className="text-sm text-gray-500">{log.details}</p>
              </div>

              <div className="timeline-middle">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 20 20"
                  fill="currentColor"
                  className="text-primary h-5 w-5"
                >
                  <path
                    fillRule="evenodd"
                    d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.857-9.809a.75.75 0 00-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 10-1.06 1.061l2.5 2.5a.75.75 0 001.137-.089l4-5.5z"
                    clipRule="evenodd"
                  />
                </svg>
              </div>

              {index !== trackings.length - 1 && (
                <hr className="bg-secondary" />
              )}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
};

export default TrackingParcel;