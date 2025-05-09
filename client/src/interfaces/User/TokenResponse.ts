export interface TokenResponse {
  access_token: string;
  refresh_token: string;
  userDetails: {
    id: string;
    email: string;
    role: string;
  };
}
