export class QueryMock {
    static get asMongoQueryModel() {
      return {
        filter: {
          titulo: 'Consulta supendida',
          descripcion: 'consulta suspendida',
          fechaInicio: 1,
          fechaFinal: 2
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