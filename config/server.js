const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('../app/routes');
const isAuth = require('../app/middlewares/auth/isAuth');
const { port, morganMode } = require('./config');
const { initializeFirebaseApp } = require('./firebase/index');
const admin = require('firebase-admin');
const serviceAccount = require('../config/firebase/serviceAccountKey.json');

initializeFirebaseApp()

const server = (app) => {
    app.disable('x-powered-by');
    app.set('port', port);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan(morganMode));
    app.use(cors());
    //app.use(isAuth);
    app.use('/', routes);

    app.get('/', (req, res) => {
        res.send('<h1>¡ConfectApp!</h1>');
    });
};

module.exports = server;