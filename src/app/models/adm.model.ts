export interface Adm {
  id: number;
  login: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface AdmResponse {
  message: string;
  count: number;
  currentPage: number;
  pageSize: number;
  result: Adm[];
}
