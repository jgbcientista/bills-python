import { Categoria } from "../categoria/categoria.model";
import { BaseResourceModel } from "src/app/shared/models/base-resource.model";

export class Lancamento extends BaseResourceModel {
    id?: string;
    estabelecimento?: string;
    data?: Date;
    valor?: number;
    categoria?: Categoria;
}