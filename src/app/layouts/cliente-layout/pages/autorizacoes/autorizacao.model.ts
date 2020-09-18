
export interface Autorizacao {
    id: number;
    cliente_id: number;
    token_id: string;
    token: Object;
    createdAt: Date;
    updateAt: Date;
}