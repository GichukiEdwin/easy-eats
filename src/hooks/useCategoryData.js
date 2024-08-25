import { useQuery } from "@tanstack/react-query";

const fetchCategoryData = async () => {
  const response = await fetch("/api/categories");
  return response.json();
};
export const useCategoryData = () => {
  return useQuery({ queryKeys: ["category"], queryFn: fetchCategoryData });
};
