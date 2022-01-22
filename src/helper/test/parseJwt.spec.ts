import { parseJwt } from "../parseJwt";

describe('parseJwt', () => {
    it('Debe devolver el token', async () => {
        const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
        const result = await parseJwt(token);
        expect(result.sub).toBe('1234567890');
    })
})
