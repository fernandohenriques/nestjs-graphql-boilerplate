export interface JwtPayload {
  email: string;
  name: string;
  expiration?: Date;
}
