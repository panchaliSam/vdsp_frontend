import axios from "axios";

const apiUrl = `packages`;

const getPackages = async () => {
    try {
      console.log("Fetching packages..."); 
      const response = await axios.get(apiUrl);
      console.log("Fetched packages data:", response.data); 
      return response.data;
    } catch (error: unknown) {
      console.error("Error in getPackages:", error); 
      if (error instanceof Error) {
        throw new Error("Error fetching packages: " + error.message);
      } else {
        throw new Error("An unknown error occurred while fetching packages");
      }
    }
  };
  
const getPackageById = async (id: number) => {
  try {
    const response = await axios.get(`${apiUrl}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error fetching package by ID: " + error.message);
    } else {
      throw new Error("An unknown error occurred while fetching package by ID");
    }
  }
};

const createPackage = async (data: { name: string; price: number; noOfPhotos: number }) => {
  try {
    const response = await axios.post(apiUrl, {
      package_name: data.name,
      package_price: data.price,
      no_of_photos: data.noOfPhotos,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error creating package: " + error.message);
    } else {
      throw new Error("An unknown error occurred while creating the package");
    }
  }
};

const updatePackage = async (
  id: number,
  data: { name: string; price: number; noOfPhotos: number }
) => {
  try {
    const response = await axios.put(`${apiUrl}/${id}`, {
      package_name: data.name,
      package_price: data.price,
      no_of_photos: data.noOfPhotos,
    });
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error updating package: " + error.message);
    } else {
      throw new Error("An unknown error occurred while updating the package");
    }
  }
};

const deletePackage = async (id: number) => {
  try {
    const response = await axios.delete(`${apiUrl}/${id}`);
    return response.data;
  } catch (error: unknown) {
    if (error instanceof Error) {
      throw new Error("Error deleting package: " + error.message);
    } else {
      throw new Error("An unknown error occurred while deleting the package");
    }
  }
};

// Export all functions as a single object
export const packageApi = {
  getPackages,
  getPackageById,
  createPackage,
  updatePackage,
  deletePackage,
};
