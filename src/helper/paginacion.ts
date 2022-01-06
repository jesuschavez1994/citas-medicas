import { MongoQueryModel } from "nest-mongo-query-parser";

export const paginaActual = async(query: MongoQueryModel) => {
    return (query.skip / query.limit) + 1;
}

export const totalPaginas = async(total: number, query: MongoQueryModel) => {
    return Math.ceil(total / query.limit);
}