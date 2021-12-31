export class SchemaMock {
    static asBuilderCall(mockReturn: jest.Mock<any, any>) {
      return jest.fn().mockImplementationOnce(() => ({
        skip: jest.fn().mockImplementationOnce(() => ({
          limit: jest.fn().mockImplementationOnce(() => ({
            exec: mockReturn,
          })),
        })),
     }));
    }
}

export class SchemaMockEventoCalendario {
    static asBuilderCall(mockReturn: jest.Mock<any, any>) {
      return jest.fn().mockImplementationOnce(() => ({
          populate: jest.fn().mockImplementationOnce(() => ({
            exec: mockReturn,
          })),
     }));
    }
}


export class CollaboratorMock {
    static get asDocumentResponse(): any {
        return {
            "usuarios": [
                {
                    "google": true,
                    "estado": true,
                    "correo": "jhongerchavez11@gmail.com",
                    "nombre": "Jhonger Gabriel Chavez Gimenez",
                    "refreshtoken": "BdQze2tuIRPy2EVDxyOQGloHwOfVk3Jy",
                    "refreshtokenexpires": "Sun Dec 19 2021 02:57:53 GMT+0800 (hora estándar de China)",
                    "id": "61b64630bd6ae6293a79a1de"
                },
                {
                    "google": false,
                    "estado": true,
                    "correo": "prueba9@gamil.com",
                    "nombre": "prueba9",
                    "refreshtoken": "LzAVKZaOPW8VhtjFcr2xtoFG9Cignszb",
                    "refreshtokenexpires": "Mon Jan 03 2022 23:23:16 GMT+0800 (hora estándar de China)",
                    "id": "61b7b3888a91471c9d6a6ad9"
                }
            ]
        }
    }

    static get mockResultUpdate(){
        return {
            "evento": {
                "fechaFinal": "1970-01-01T00:00:00.002Z",
                "fechaInicio": "1970-01-01T00:00:00.001Z",
                "descripcion": "Consulta suspendida",
                "titulo": "consulta suspendida",
                "usuario": {
                    "_id": "61b7b3888a91471c9d6a6ad9",
                    "google": false,
                    "estado": true,
                    "correo": "prueba9@gamil.com",
                    "nombre": "prueba9"
                },
                "id": "61bf7a329f52f83c2adbc975"
            }
        }
    }
  
    static get asDTORequest() {
      return {
        name: 'John Doe',
        age: 33,
        position: 'Senior Analyst',
      };
    }
  }