import axiosInstance from "app/axios/AxiosInstance";
import { useMutation, useQueryClient } from "react-query";
import { toast } from "react-toastify";

const createData = async (data) => {
  const response = await axiosInstance.post("/data", data);
  return response.data;
};

const useAddData = () => {
  const queryClient = useQueryClient();
  return useMutation(createData, {
    onSuccess: (data) => {
      if (data?.success) {
        toast.success("added successfully");
        queryClient.invalidateQueries("all-data");
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response.data.message || "Duplicate lead. Failed to add";
      toast.error(errorMessage);
      console.log("🚀 ~ useAddData ~ errorMessage:", errorMessage);
    },
  });
};


export default useAddData;