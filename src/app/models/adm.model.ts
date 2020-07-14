export interface Adm {
  id: number;
  login: string;
  ativo: boolean;
  createdAt: Date;
  updatedAt: Date;
  isChecked: boolean;
}

export interface AdmResponse {
  message: string;
  count: number;
  currentPage: number;
  pageSize: number;
  result: Adm[];
}
