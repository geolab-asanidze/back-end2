const express = require('express');
const app = express()
const port = 3001

const users = [
    {
        id: 1,
        name: "Giorgi",
        age: 28,
        position: "Developer"
    },
    {
        id: 2,
        name: "Ana",
        age: 25,
        position: "Designer"
    },
    {
        id: 3,
        name: "Irakli",
        age: 23,
        position: "Developer"
    },
    {
        id: 4,
        name: "Giorgi",
        age: 24,
        position: "QA Engineer"
    }
]

app.use(express.json());

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

app.get('/api/users', (req, res) => {
    const { position } = req.query;

    // const { name, age } = obj; // const name = obj.name   const age = obj.age

    if (position) {
        const filteredUsers = users.filter(
            user => user.position.toLowerCase() === position.toLowerCase()
        );
        return res.json(filteredUsers);
    }

    res.json(users);
});

app.get('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    res.json(user);
});

app.post('/api/users', (req, res) => {
    const { name, age, position } = req.body;

    if (!name || !age || !position) {
        return res.status(400).json({ message: 'Name, age, and position are required' });
    }

    const newId = users.length > 0 ? Math.max(...users.map(u => u.id)) + 1 : 1;

    const newUser = {
        id: newId,
        name,
        age: Number(age),
        position
    };

    users.push(newUser);

    res.status(201).json(newUser);
});

app.put('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const { name, age, position } = req.body;

    if (!name || !age || !position) {
        return res.status(400).json({ message: 'Name, age, and position are required' });
    }

    user.name = name;
    user.age = Number(age);
    user.position = position;

    res.json(user);
});

app.patch('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const user = users.find(u => u.id === id);

    if (!user) {
        return res.status(404).json({ message: 'User not found' });
    }

    const { name, age, position } = req.body;

    if (name !== undefined) user.name = name;
    if (age !== undefined) user.age = Number(age);
    if (position !== undefined) user.position = position;

    res.json(user);
});

app.delete('/api/users/:id', (req, res) => {
    const id = parseInt(req.params.id, 10);
    const index = users.findIndex(u => u.id === id);

    if (index === -1) {
        return res.status(404).json({ message: 'User not found' });
    }

    const deletedUser = users.splice(index, 1)[0];
    res.json({ message: 'User deleted successfully', user: deletedUser });
});


app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})