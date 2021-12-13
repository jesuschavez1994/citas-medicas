const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.ID_CLIENTE_GOOGLE);

export async function verificacionGoogle(token = '') {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.ID_CLIENTE_GOOGLE,  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const {name, picture, email} = ticket.getPayload();
    return {
        nombre: name, 
        avatar: picture, 
        correo: email
    };
}