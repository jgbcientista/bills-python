import { Categoria } from "../categoria/categoria.model";
import { BaseResourceModel } from "src/app/shared/models/base-resource.model";

export class Lancamento extends BaseResourceModel {
    constructor(
        public id?: number,
        public estabelecimento?: string,
        public data?: Date,
        public valor?: number,
        public categoria?: Categoria) {
        super();
    }

    static fromJson(jsonData: any): Lancamento {
        return Object.assign(new Lancamento(), jsonData);
    }
}

