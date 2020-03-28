const port = process.env.PORT || 3000;
const morganMode = process.env.DEV ? 'dev' : 'tiny';

module.exports = { port, morganMode };