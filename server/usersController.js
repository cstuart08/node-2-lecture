const data = require('../data.json')
let id = data.length + 1
module.exports = {
    // Get All Users
    getAllUsers: (req, res) => {
        const {email} = req.query
        let users = [...data]
        if (email) {
            let filteredUsers = users.filter(e => e.email === email)
            if (filteredUsers && filteredUsers.length > 0) {
                res.status(200).send(filteredUsers)
            } else {
                res.sendStatus(404)
            }
        }
        res.status(200).send(users)
    },
    // Get Specific User
    getUser: (req, res) => {
        let users = [...data]
        let foundUser = users.find(e => e.id === +req.params.id)
        if (foundUser) {
            res.status(200).send(foundUser)
        } else {
            res.sendStatus(404)
        }
    },
    // Add A User
    addUser: (req, res) => {
        console.log("Got here")
        let {user} = req.body
        user = {...user, id: id}
        data.push(user)
        id++
        console.log(data[data.length - 1])
        res.status(200).send(data)
    },
    updateUser: (req, res) => {
        const {id} = req.params
        const {user} = req.body
        let index = data.findIndex(e => e.id === +id)

        if (index >= 0) {
            let updatedUser = {
                id: +id,
                name: user.name || data[index].name,
                email: user.email || data[index].email
            }
            data[index] = updatedUser
            res.status(200).send(data)
        } else {
            res.status(404).send("User does not exist.")
        }
    },
    deleteUser: (req, res) => {
        const {id} = req.params
        let index = data.findIndex(e => e.id === +id)
        if (index >= 0) {
            data.splice(index, 1)
            res.status(200).send(data)
        } else {
            res.status(404).send("User does not exist.")
        }
    }
}