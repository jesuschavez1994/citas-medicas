export class QueryMock {
    static get asMongoQueryModel() {
      return {
        filter: {
          title: 'Consulta supendida',
          description: 'consulta suspendida',
          start: 1,
          end: 2
        },
        select: {},
        sort: {},
        limit: 100,
        skip: 0,
        populate: {
          path: 'usuario',
          select: { 'name': 1, 'email': 1, 'status': 1, 'google': 1 }
        },
      };
    }
}

// export class QueryMockEventoCalendario {
//   static get asMongoQueryModel() {
//     return {
//       filter: {},
//       select: {},
//       sort: {},
//       limit: 2,
//       skip: 0,
//       populate: {
//         path: 'user',
//         select: { 'name': 1, 'email': 1, 'status': 1, 'google': 1 }
//       },
//     };
//   }
// }