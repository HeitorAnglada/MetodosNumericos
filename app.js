const express = require('express');
const cors = require('cors');
const path = require('path');

const app = express();

app.use(cors(
    {
        origin: '*'
    }
));

app.use((req, res, next)=>{
    res.set('X-timestamp', Date.now());
    next();
})

const options = {
    dotfiles: 'ignore',
    etag: false,
    extensions: ['htm', 'html','css', 'js'],
    index: ['main.html'],
    maxAge: '1m',
    redirect: true,
}

app.use(express.static(path.join(__dirname, 'public'), options))

app.use('*', (req, res) => {
    res.json({
        at: new Date().toISOString(),
        method: req.method,
        hostname: req.hostname,
        ip: req.ip,
        query: req.query,
        headers: req.headers,
        cookies: req.cookies,
        params: req.params
    }).end()
})


module.exports = app