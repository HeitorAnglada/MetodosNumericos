const express = require('express');
const cors = require('cors');

const port = 8081;

const app = express();

app.use(cors(
    {
        origin: '*'
    }
));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.listen(port, () => {
    console.info('Server listening on port ' + port);
});