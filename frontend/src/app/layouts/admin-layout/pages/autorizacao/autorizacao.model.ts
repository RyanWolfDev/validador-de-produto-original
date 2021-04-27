export interface Autorizacao {
    id: number;
    token_id: number;
    cliente_id: number;
    token: {};
    cliente: {};
    createdAt: Date;
    updatedAt: Date;
    isChecked: boolean;
}
