export interface Cliente {
    id: number;
    nome: string;
    email: string;
    senha: string;
    ativo: boolean;
    createdAt: Date;
    updatedAt: Date;
}