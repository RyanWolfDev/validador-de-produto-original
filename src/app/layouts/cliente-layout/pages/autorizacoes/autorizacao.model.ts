import { Produto } from "./produto.model";

export interface Autorizacao {
    id: number;
    cliente_id: number;
    token_id: string;
    token: {
        id: number;
        token: string;
        produto_id: string;
        ativo: boolean;
        createdAt: Date;
        updatedAt: Date;
        produto: Produto;
    };
    createdAt: Date;
    updateAt: Date;
}

export interface AutorizacaoResponse {
    message: string;
    result: Autorizacao[],
    currentPage: number,
    pageSize: number,
    count: number

}