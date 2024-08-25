import { useQuery } from "@tanstack/react-query";

const fetchMenuItems = async () => {
  const response = await fetch("/api/menu_items");
  if (!response.ok) {
    throw new Error("Failed to fetch user data");
  }
  return response.json();
};
export const useMenuItems = () => {
  return useQuery({ queryKey: ["menu_items"], queryFn: fetchMenuItems });
};
useQuery;
