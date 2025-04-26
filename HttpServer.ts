
import express from 'express';
import dotenv from 'dotenv';
import { startDB } from './db/Database';
import { createUser, getAll } from './endpoints/user/UserService'
import bodyParser from 'body-parser'
import { getUserById } from './endpoints/user/UserService'
import { updateUser } from './endpoints/user/UserService';
import { deleteUser } from './endpoints/user/UserService';

dotenv.config();

const app = express();

const port = process.env.PORT;

app.use(bodyParser.json())

app.get('/api/users', async (req: any, res: any) => {

    if (req) {
        console.log("Got requets")
    }
    const users = await getAll();

    var resultUsers = users.map(function (item) {
        return {
            "userID": item.userID,
            "firstName": item.firstName,
            "lastName": item.lastName,
            "isAdministrator": item.isAdministrator,
            "password": item.password, }
    })

    res.send(Object.values(resultUsers));
});

app.post('/api/users', async (req: any, res: any) => {
    if (req) {
        console.log("Want to create new user with data: " + JSON.stringify(req.body))
    }
    await createUser(req.body);
    res.send("Habe user angelegt");
});

app.get('/api/users/:id', async (req: any, res: any) => {
    if (req) {
        console.log("Want to get user with id: " + req.params.id)
    }

    const user = await getUserById(req.params.id);
    
    if (user) {
        res.send(user);
    } else {
        res.status(404).send('User not found');
    }
});

app.put('/api/users/:id', async (req: any, res: any) => {
    console.log("Want to update user with id: " + req.params.id);
    const updatedUser = await updateUser(req.params.id, req.body);

    if (updatedUser) {
        res.send(updatedUser);
    } else {
        res.status(404).send('User not found');
    }
});

app.delete('/api/users/:id', async (req: any, res: any) => {
    console.log("Want to delete user with id: " + req.params.id);
    const deletedUser = await deleteUser(req.params.id);

    if (deletedUser) {
        res.send(deletedUser);
    } else {
        res.status(404).send('User not found');
    }
});



startDB()

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});     