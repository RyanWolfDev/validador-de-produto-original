export interface AdminLogin {
  login: string;
  senha: string;
}

export interface AdminLoginResponse {
  message: string;
  adm_id: number;
  login: string;
  token: string;
  expiresIn: number;
}
