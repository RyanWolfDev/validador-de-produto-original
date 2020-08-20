export interface Token {
    id: number;
    token: string;
    produto_id: string;
    ativo: boolean;
    createdAt: Date;
    updatedAt: Date;
    isChecked: boolean;
}