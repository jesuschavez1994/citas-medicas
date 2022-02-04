export const   generateP=  async() => {
    var pass = '';
    var str = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ' + 'abcdefghijklmnopqrstuvwxyz0123456789@#$';
    for( let i = 0; i < 8; i++) {
        let char = Math.floor(Math.random()* str.length + 1);
        pass += str.charAt(char)
    }
    return pass;
}