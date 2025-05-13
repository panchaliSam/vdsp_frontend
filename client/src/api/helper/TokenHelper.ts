export const getAccessToken = (): string | null => {
  return localStorage.getItem("access_token");
};

export const getRefreshToken = (): string | null => {
  return localStorage.getItem("refresh_token");
};

export const setTokens = (accessToken: string, refreshToken: string) => {


  if (accessToken.length > 0) {
    localStorage.setItem("access_token", accessToken);
  }

  if (refreshToken.length > 0) {
    localStorage.setItem("refresh_token", refreshToken);
  }

};

export const clearTokens = () => {
  localStorage.removeItem("access_token");
  localStorage.removeItem("refresh_token");
};
