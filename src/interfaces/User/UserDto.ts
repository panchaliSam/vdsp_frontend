export type Role = "ROLE_CUSTOMER" | "ROLE_ADMIN" | "ROLE_STAFF";

export interface UserDto {
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string;
  role: Role;
}
