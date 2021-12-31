export class QueryMock {
    static get asMongoQueryModel() {
      return {
        limite: 3,
        desde: 1,
        populate: ['usuario', 'nombre correo estado google']
      };
    }
}