export interface LoginModelData {
  login: string;
  senha: string;
}

export interface LoginModelResponse {
  message: string;
  adm_id: number;
  login: string;
  token: string;
  expiresIn: number;
}
