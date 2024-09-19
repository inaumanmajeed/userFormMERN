import { useMutation, useQueryClient } from "@tanstack/react-query";
import axiosInstance from "app/axios/AxiosInstance";
import { toast } from "react-toastify";

const updateData = async (email, body) => {
  const response = await axiosInstance.put(`/data/${email}`, body);
  return response.data;
};

const useUpdateData = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateData,
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("updated successfully");
        queryClient.invalidateQueries("all-data");
      }
    },
    onError: (error) => {
      const errorMessage = error.response.data.message || "Failed to update";
      toast.error(errorMessage);
      console.log("🚀 ~ useUpdateData ~ errorMessage:", errorMessage);
    },
  });
};

export default useUpdateData;
