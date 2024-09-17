import axiosInstance from "app/axios/AxiosInstance";

// Create
export const createData = async (data) => {
  try {
    const response = await axiosInstance.post("/data", data);
    return response.data;
  } catch (error) {
    console.error("Error creating data:", error);
    throw error;
  }
};

// Read
export const getData = async (email) => {
  try {
    const response = await axiosInstance.get(`/data/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error fetching data:", error);
    throw error;
  }
};

// Update
export const updateData = async (email, newData) => {
  try {
    const response = await axiosInstance.put(`/data/${email}`, newData);
    return response.data;
  } catch (error) {
    console.error("Error updating data:", error);
    throw error;
  }
};

// Delete
export const deleteData = async (email) => {
  try {
    const response = await axiosInstance.delete(`/data/${email}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting data:", error);
    throw error;
  }
};
