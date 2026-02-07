// export interface User{
//   idToken: string;
//   email: string;
//   refreshToken: string;
//   expiresIn: string;
//   localId: string;
//   registered?: boolean
// }

export interface User{
  accessToken: string;
  email: string;
  expiresAt: number;
  userId: string;
}

