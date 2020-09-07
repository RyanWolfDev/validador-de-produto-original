export interface ClienteLogin {
    email: string;
    senha: string;
  }
  
  export interface ClienteLoginResponse {
    message: string;
    adm_id: number;
    login: string;
    token: string;
    expiresIn: number;
  }
  