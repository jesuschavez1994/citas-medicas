export class QueryMock {
    static get asMongoQueryModel() {
      return {
        filter: {
          title: 'Consulta supendida',
          notes: 'consulta suspendida',
          start: 1,
          end: 2
        },
        select: {},
        sort: {},
        limit: 100,
        skip: 0,
        populate: {
          path: 'usuario',
          select: { 'nombre': 1, 'correo': 1, 'estado': 1, 'google': 1 }
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
//         path: 'usuario',
//         select: { 'nombre': 1, 'correo': 1, 'estado': 1, 'google': 1 }
//       },
//     };
//   }
// }