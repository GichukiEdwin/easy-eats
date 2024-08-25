import { useQuery } from "@tanstack/react-query";

const fetchUserData = async () => {
  const response = await fetch("/api/profile");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};
export const useUserData = () => {
  return useQuery({ queryKey: "user", queryFn: fetchUserData });
};
