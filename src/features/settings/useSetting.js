import { useQuery } from "@tanstack/react-query";
import { getSettings } from "../../services/apiSettings";

export function useSetting() {
  const { isLoading, errors, data } = useQuery({
    queryKey: ["settings"],
    queryFn: getSettings,
  });

  return { isLoading, errors, data };
}
