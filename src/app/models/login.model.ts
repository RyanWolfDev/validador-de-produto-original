export interface LoginModelData {
  login: string;
  senha: string;
}

export interface LoginModelResponse {
  message: string;
  adm_id: string;
  token: string;
  expiresIn: number;
}
