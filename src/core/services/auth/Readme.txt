passport local solo admite dos campos (por defecto, nombre de usuario y contraseña, pero puede configurarlo pasando los parámetros "usernameField" y "passwordField" a la llamada super () en el constructor de la estrategia).
Sin embargo, puede acceder a todo el objeto req en la función de validación, si también pasa passReqToCallback: true a la llamada super ()
luego, la función de validación lo recibirá como el primer parámetro y podrá hacer lo que sea con él. Aquí hay un fragmento de mi versión.

Por ejemplo: 

@Injectable()
export class LocalStrategy extends PassportStrategy(Strategy, 'local') {
    constructor(private readonly userService: UserService) {
        super({
            usernameField: 'id',
            passwordField: 'token',
            passReqToCallback: true,
        });
    }
    async validate(req: Request, id: string, token: string) {
        // whatever
}}
 
