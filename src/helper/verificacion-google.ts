const {OAuth2Client} = require('google-auth-library');
const CLIENT_ID = '602401333423-l49g9jno786sd83ca3tma5ucgssi6sh8.apps.googleusercontent.com'

const client = new OAuth2Client(CLIENT_ID);

export async function verificacionGoogle(token = '') {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
    });
    const {name, picture, email} = ticket.getPayload();
    return {
        nombre: name, 
        avatar: picture, 
        correo: email
    };
}