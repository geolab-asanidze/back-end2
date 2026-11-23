const express = require('express');
const app = express()
const port = 3001

app.use((req, res, next) => {
    const time = new Date().toISOString();
    console.log(`[${time}] ${req.method} ${req.originalUrl}`);
    next();
});

app.get('/', (req, res) => {
    res.send('Hello World!')
})

app.get('/tbc', (req, res) => {
    res.send('TBC ტექ სკოლა')
})

app.get('/gamarjoba', (req, res) => {
    res.send('გამარჯობა')
})

app.get('/user', (req, res) => {
    res.json({
        name: "Giorgi",
        age: 28,
        position: "Developer"
    });
})

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})