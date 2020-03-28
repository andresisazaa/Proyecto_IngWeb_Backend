const bodyParser = require('body-parser');
const morgan = require('morgan');
const cors = require('cors');
const routes = require('../app/routes');

const {
    port,
    morganMode
} = require('./config');

const server = (app) => {
    app.disable('x-powered-by');
    app.set('port', port);
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: true }));
    app.use(morgan(morganMode));
    app.use(cors());
    app.use('/', routes);
};

module.exports = server;