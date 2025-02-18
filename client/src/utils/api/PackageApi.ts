import axios from "axios";

interface Package{
  packageId: number;
  packageName: string;
  packagePrice: number;
  noOfPhotos: number;
}

const API_BASE_URL = `/api`;

const getAllPackages = async() : Promise<Package[]> => {
  try{
    const response = await axios.get<Package[]>(`${API_BASE_URL}/package`);
    return response.data;
  }catch(error){
    console.error("Error fetching packages: ", error);
    throw error;
  }
};

export const PackageApi = {
  getAllPackages
};