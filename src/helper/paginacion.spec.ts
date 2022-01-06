import { paginaActual, totalPaginas } from "./paginacion";

describe('Prueba de paginacion', () => {
    it('Debe devolver la pagina actual', async () => {
        const query: any = {
            skip: 0,
            limit: 10,
        };
        const result = await paginaActual(query);
        expect(result).toBe(1);
    });

    it('Debe devolver el total de paginas', async () => {
        const total = 100;
        const query: any = {
            skip: 0,
            limit: 10,
        };
        const result = await totalPaginas(total, query);
        expect(result).toBe(10);
    })
})
