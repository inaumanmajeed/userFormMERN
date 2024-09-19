import { QueryClient, useMutation } from "@tanstack/react-query";
import axiosInstance from "app/axios/AxiosInstance";
import { toast } from "react-toastify";

const deleteData = async (email) => {
  const response = await axiosInstance.delete(`/data/${email}`);
  return response.data;
};

const queryClient = new QueryClient();
const useDeleteData = (email) => {
  return useMutation({
    mutationFn: deleteData,
    mutationKey: ["getemail", email],
    onSuccess: () => {
      toast.success("Deleted successfully");
      queryClient.invalidateQueries("all-data");
    },
    onError: (error) => {
      const errorMessage = error.response?.data?.message || "Failed to delete";
      toast.error(errorMessage);
      console.error("Error deleting data:", error);
    },
  });
};

export default useDeleteData;
