export interface TokenResponse {
  accessToken: string;
  refreshToken: string;
  userDetails: {
    id: string;
    email: string;
    role: string;
  };
}
