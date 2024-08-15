const app = require('./app.js');

const port = 8081;



app.listen(port, () => {
    console.info('Server listening on port ' + port);
});