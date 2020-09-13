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

export interface Cliente {
  id: number;
  nome: string;
  email: string;
  senha: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
  autorizacoes: any[];
  isChecked: boolean;
}

