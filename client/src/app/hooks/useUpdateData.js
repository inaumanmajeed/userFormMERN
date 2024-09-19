import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "app/axios/AxiosInstance";
import { toast } from "react-toastify";

const updateData = async ({ email, body }) => {
  const response = await axiosInstance.put(`/data/${email}`, body);
  return response.data;
};

const useUpdateData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    // mutationKey: ["updateData", { email, body }],
    mutationFn: updateData,
    onSuccess: (data) => {
      console.log("🚀 ~ useUpdateData ~ data:", data);
      if (data?.success && data.success === true) {
        toast.success("Updated successfully");
        queryClient.invalidateQueries(["all-data"]);
      }
    },
    onError: (error) => {
      const errorMessage = error.message || "Failed to update";
      toast.error(errorMessage);
      console.log("🚀 ~ useUpdateData ~ errorMessage:", errorMessage);
    },
  });
};

export default useUpdateData;
