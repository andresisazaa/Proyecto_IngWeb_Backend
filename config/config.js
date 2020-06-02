const port = process.env.PORT || 3000;
const morganMode = process.env.DEV ? 'dev' : 'tiny';

const emailSender = 'pruebas199608@gmail.com';

module.exports = { port, morganMode, emailSender };