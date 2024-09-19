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
    queryKey: ["getemail", email],
    enabled: !!email,
    onSuccess: (data) => {
      console.log("🚀 ~ useGetData ~ data:", data);
      if (data?.success && data.success === true) {
        toast.success("Data fetched successfully");
      }
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message || "Failed to fetch data";
      toast.error(errorMessage);
      console.log("🚀 ~ useGetData ~ errorMessage:", errorMessage);
    },
  });
};

export default useGetData;
