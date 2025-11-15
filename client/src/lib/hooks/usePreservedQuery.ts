import { useLocation } from "react-router";

export const usePreservedQuery = () => {
  const { search } = useLocation();

  return search;
};
