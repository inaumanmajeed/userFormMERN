import { useQuery } from "@tanstack/react-query";
import axiosInstance from "app/axios/AxiosInstance";
import { toast } from "react-toastify";

const getData = async ({ queryKey }) => {
  const [_querykey, email] = queryKey;
  const response = await axiosInstance.get(`/data/${email}`);
  return response.data;
};

const useGetData = (email) => {
  return useQuery({
    queryFn: getData,
    queryKey: ["all-data", email],
    enabled: !!email,
    onSuccess: (data) => {
      if (data) {
        toast.success("Data fetched successfully");
      }
    },
    onError: (error) => {
      const errorMessage =
        error.message || "Failed to fetch data";
      toast.error(errorMessage);
      console.log("🚀 ~ useGetData ~ errorMessage:", errorMessage);
    },
  });
};

export default useGetData;
