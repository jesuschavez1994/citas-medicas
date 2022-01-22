import { CrearUsuarioDTO } from "src/core/dto/usuario.dto";

export class SchemaMock {
  static asBuilderCall(calls: string[], mockReturn: jest.Mock<any, any>) {
    if (!calls.length) {
      return;
    }

    return this.mockBuilderCall(calls, mockReturn);
  }

  static mockBuilderCall(
    list: string[],
    mockReturn: jest.Mock<any, any>,
    index: number = 0,
  ) {
    if (index === list.length) {
      return mockReturn;
    }

    return jest.fn().mockImplementationOnce(() => ({
      [list[index]]: this.mockBuilderCall(list, mockReturn, index + 1),
    }));
  }
}


export class CollaboratorMock {

  static get mockUsuarioResult(){
    return {
      _id: '61b7b3888a91471c9d6a6ad9',
      google: false,
      status: true,
      password: '$2b$10$/cCPqfEO5IF3yb0AQ1Qz5.1QepQOgXgoaXybd7svvV4AIlSQnTogO',
      email: 'prueba9@gamil.com',
      name: 'prueba9',
      __v: 0,
      refreshtoken: 'dvwPH5KY39QhNFpOfb8CReQBOKlpx2ez',
      refreshtokenexpires: 'Sun Dec 26 2021 05:23:17 GMT+0800 (hora estándar de China)'
    }
  };

  static get asDocumentResponse(): any {
    return {
      "users": [
        {
          "google": true,
          "status": true,
          "email": "jhongerchavez11@gmail.com",
          "name": "Jhonger Gabriel Chavez Gimenez",
          "refreshtoken": "BdQze2tuIRPy2EVDxyOQGloHwOfVk3Jy",
          "refreshtokenexpires": "Sun Dec 19 2021 02:57:53 GMT+0800 (hora estándar de China)",
          "id": "61b64630bd6ae6293a79a1de"
        },
        {
          "google": false,
          "status": true,
          "email": "prueba9@gamil.com",
          "name": "prueba9",
          "refreshtoken": "LzAVKZaOPW8VhtjFcr2xtoFG9Cignszb",
          "refreshtokenexpires": "Mon Jan 03 2022 23:23:16 GMT+0800 (hora estándar de China)",
          "id": "61b7b3888a91471c9d6a6ad9"
        }
      ]
    }
  }

  static get mockResultUpdate(){
    return {
      "event": {
        "end": "1970-01-01T00:00:00.002Z",
        "start": "1970-01-01T00:00:00.001Z",
        "description": "Consulta suspendida",
        "title": "consulta suspendida",
        "user": {
          "_id": "61b7b3888a91471c9d6a6ad9",
          "google": false,
          "status": true,
          "email": "prueba9@gamil.com",
          "name": "prueba9"
        },
        "id": "61bf7a329f52f83c2adbc975"
      }
    }
  }

  static get mockResultEventosPaginados(){
    return {
      "events": [
        {
          "user": {
            "_id": "61cb3641dad84d8884bef840",
            "google": false,
            "status": true,
            "email": "jesus1@gamil.com",
            "name": "jesus1"
          },
          "end": "1970-01-01T00:00:00.002Z",
          "start": "1970-01-01T00:00:00.001Z",
          "description": "Consulta Jesus",
          "title": "Consulta",
          "id": "61d06b22e0f80e9488935dc8"
        },
        {
          "user": {
            "_id": "61cb3641dad84d8884bef840",
            "google": false,
            "status": true,
            "email": "jesus1@gamil.com",
            "name": "jesus1"
          },
          "end": "1970-01-01T00:00:00.002Z",
          "start": "1970-01-01T00:00:00.001Z",
          "description": "Consulta Jesus",
          "title": "Consulta",
          "id": "61d06b23e0f80e9488935dca"
        }
      ],
      "totalEventos": 6,
      "totalPaginas": 3,
      "paginaActual": 2
    }
  }

  static get mockTiketGoogle () {
    return {
      envelope: {
        alg: 'RS256',
        kid: 'd01c1abe249269f72ef7ca2613a86c9f05e59567',
        typ: 'JWT'
      },
      payload: {
        iss: 'https://accounts.google.com',
        nbf: 1641339498,
        aud: '602401333423-l49g9jno786sd83ca3tma5ucgssi6sh8.apps.googleusercontent.com',
        sub: '107748401187645064156',
        hd: 'kdsoft.io',
        email: 'jesus.chavez@kdsoft.io',
        email_verified: true,
        azp: '602401333423-l49g9jno786sd83ca3tma5ucgssi6sh8.apps.googleusercontent.com',
        name: 'Jesus Chavez',
        picture: 'https://lh3.googleusercontent.com/a/AATXAJymqM8rsadAUNW3tZqabFfWUhhaDzUlpEuEvCnF=s96-c',
        given_name: 'Jesus',
        family_name: 'Chavez',
        iat: 1641339798,
        exp: 1641343398,
        jti: '4e7ae96ac3a584a1d6ad2673626a1fe1f044d3c6'
      }
    }
    
  }

  static get args() {
    return {
      targetName: 'CrearUsuarioDTO',
      property: 'email',
      object: {
        name: 'test',
        email: 'test@gamil.com',
        password: '12345678',
        status: true,
        google: false
      },
      value: 'test@gamil.com',
      constraints: []
    }
  }
}