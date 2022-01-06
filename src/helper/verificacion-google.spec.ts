import { JwtModule } from '@nestjs/jwt';
import { Test, TestingModule } from '@nestjs/testing';
import { OAuth2Client } from 'google-auth-library';
import { CollaboratorMock } from '../core/services/test/mock/schema.mock';
import {verificacionGoogle} from './verificacion-google';
const client = new OAuth2Client(process.env.ID_CLIENTE_GOOGLE);

describe('Verificacion de Google', () => {
  jest.setTimeout(40000)
    beforeEach(async () => {
        const module: TestingModule = await Test.createTestingModule({
          imports: [
            JwtModule.register({
                secret: process.env.ID_CLIENTE_GOOGLE
            }),
          ],
        }).compile();
      });
    it('Debe de devolver la informacion de usuario google', async () => {
      // hacer un jest.spyOn para ticket
      jest.spyOn(client, 'verifyIdToken').mockReturnValue(CollaboratorMock.mockTiketGoogle.payload as any);
      const token = 'eyJhbGciOiJSUzI1NiIsImtpZCI6ImQwMWMxYWJlMjQ5MjY5ZjcyZWY3Y2EyNjEzYTg2YzlmMDVlNTk1NjciLCJ0eXAiOiJKV1QifQ.eyJpc3MiOiJodHRwczovL2FjY291bnRzLmdvb2dsZS5jb20iLCJuYmYiOjE2NDE0ODU4MDUsImF1ZCI6IjYwMjQwMTMzMzQyMy1sNDlnOWpubzc4NnNkODNjYTN0bWE1dWNnc3NpNnNoOC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsInN1YiI6IjEwNzc0ODQwMTE4NzY0NTA2NDE1NiIsImhkIjoia2Rzb2Z0LmlvIiwiZW1haWwiOiJqZXN1cy5jaGF2ZXpAa2Rzb2Z0LmlvIiwiZW1haWxfdmVyaWZpZWQiOnRydWUsImF6cCI6IjYwMjQwMTMzMzQyMy1sNDlnOWpubzc4NnNkODNjYTN0bWE1dWNnc3NpNnNoOC5hcHBzLmdvb2dsZXVzZXJjb250ZW50LmNvbSIsIm5hbWUiOiJKZXN1cyBDaGF2ZXoiLCJwaWN0dXJlIjoiaHR0cHM6Ly9saDMuZ29vZ2xldXNlcmNvbnRlbnQuY29tL2EvQUFUWEFKeW1xTThyc2FkQVVOVzN0WnFhYkZmV1VoaGFEelVscEV1RXZDbkY9czk2LWMiLCJnaXZlbl9uYW1lIjoiSmVzdXMiLCJmYW1pbHlfbmFtZSI6IkNoYXZleiIsImlhdCI6MTY0MTQ4NjEwNSwiZXhwIjoxNjQxNDg5NzA1LCJqdGkiOiJmOGFhZGUyMTQxYzJjMDg4ZTEwYTQ0MzhjODVlMGM4NzlkYjM4ZTkwIn0.e7zhRH-j6GMWVEYdeyu9ITTWYLqtHUqZYwZiDxQWLyYywX9lmiXALR0-vDJT01wkNBP5EfJHFl4OFsWkvDZzJ_KAH2cqgxLFBsewYU0SVXEz4BCSmr2q6fFYp3PkFCGETWqrohnkuhyayL-qZhHVZ2Fvi1EK_RcsgkhzmeiRC-wgfosnQsz290fOLhkzreCY6NShT4hDd3poWqfcCj2Hj6QI42BSCIzFoXoSpzbLE8aJeQBJ1IP0IL6RS2fmokJLD5lDs5pAsB_ACQ7jv-1MNMFJG5ZR7hk6GCOOWHHrFywkzCnGV6hi8ctoblHiwtm6vMP34CucoaZ440MbnMZLeQ';
      const result = await verificacionGoogle(token);
      expect(result.nombre).toBe('Jesus Chavez');
      expect(result.avatar).toBe('https://lh3.googleusercontent.com/a/AATXAJymqM8rsadAUNW3tZqabFfWUhhaDzUlpEuEvCnF=s96-c')
    })
})
