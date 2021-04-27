export interface Produto {
    id: number;
    descricao: string;
    sku: string;
    imagemUrl: string;
    ativo: boolean;
    createdAt: Date;
    updatedAt: Date;
    tokens: any[];
    isChecked: boolean;
}