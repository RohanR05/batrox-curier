import React from "react";
import useAuth from "../../../Hooks/useAuth";
import useAxiosSecure from "../../../Hooks/useAxiosSecure";
import { useQuery } from "@tanstack/react-query";

const DashBoardHome = () => {
  const { user } = useAuth();
  const axiosSecure = useAxiosSecure();

  const {
    data: profile,
    isLoading,
    isError,
  } = useQuery({
    queryKey: ["user-profile", user?.email],
    enabled: !!user?.email,
    queryFn: async () => {
      const res = await axiosSecure.get(`/users/${user.email}`);
      return res.data;
    },
  });

  if (isLoading) return <div>Loading...</div>;
  if (isError || !profile) return <div>Could not load profile.</div>;

  return (
    <div className="p-4">
      <div className="flex items-center gap-4">
        <img
          src={profile?.photoURL}
          alt={profile.name}
          className="w-20 h-20 rounded-full object-cover"
        />
        <div>
          <h2 className="text-xl font-semibold">{profile.name}</h2>
          <p className="text-gray-600">{profile.email}</p>
        </div>
      </div>

      <div className="mt-4 space-y-1">
        <p>
          <span className="font-medium">Role:</span> {profile.role}
        </p>
        <p>
          <span className="font-medium">Joined:</span>{" "}
          {new Date(profile.createdAt).toLocaleDateString()}
        </p>
      </div>
    </div>
  );
};

export default DashBoardHome;
