import { BaseResourceModel } from "src/app/shared/models/base-resource.model";

export class Fatura extends BaseResourceModel {
    constructor(
        public id?: number,
        public data_vencimento?: Date,
        public data_pagamento?: Date,
        public valor?: number) {
        super();
    }

    static fromJson(jsonData: any): Fatura {
        return Object.assign(new Fatura(), jsonData);
    }
}

