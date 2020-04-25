const port = process.env.PORT || 3000;
const morganMode = process.env.DEV ? 'dev' : 'tiny';

const emailSender = {
    service: 'gmail',
    auth: {
        user: 'pruebas199608@gmail.com',
        pass: 'IngenieriaWeb2019-2'
    }
};

module.exports = { port, morganMode, emailSender };