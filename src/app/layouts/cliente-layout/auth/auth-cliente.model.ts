export interface ClienteLogin {
  email: string;
  senha: string;
}

export interface ClienteLoginResponse {
  message: string;
  cliente_id: number;
  token: string;
  cliente_nome: string;
  expiresIn: number;
}

