const express = require('express')

const app = express()

app.use(express.json()) // Top Level Middleware

// Users
const userController = require('./usersController')
app.get('/api/users', userController.getAllUsers)
app.get('/api/users/:id', userController.getUser)
app.post('/api/users', userController.addUser)
app.put('/api/users/:id', userController.updateUser)
app.delete('/api/users/:id', userController.deleteUser)

// Catch-All
app.get('*', (_, res) => {
    res.status(404).send("Uh oh, this page does not exist!")
})

// Listener
app.listen(5555, () => console.log("Server is listening on port 5555."))