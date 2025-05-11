export const getAuthHeaders = () => {
  const accessToken = localStorage.getItem("access_token");
  if (!accessToken) {
    throw new Error("No access token found.");
  }
  return {
    Authorization: `Bearer ${accessToken}`,
  };
};
