import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateSetting } from "../../services/apiSettings";
import toast from "react-hot-toast";

export default function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isUpdating, mutate } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings updated successfully.");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
  });

  return { isUpdating, mutate };
}
