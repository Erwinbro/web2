
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

app.get('/api/publicUsers', async (req: any, res: any) => {

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

app.post('/api/publicUsers', async (req: any, res: any) => {
    if (!req.body.userID) {
        res.status(400).send("Missing 'userID' field in request body");
        return;
    }
    try {
        if (req) {
        console.log("Want to create new user with data: " + JSON.stringify(req.body))
    }
    const user = await createUser(req.body);
    res.send(user);
    } catch (error) {
        if(error instanceof Error && error.message.includes("already exists")) {
            res.status(400).send({"error":'already exists'});
        }
        
    }
    
});

app.get('/api/publicUsers/:id', async (req: any, res: any) => {
    if (req) {
        console.log("Want to get user with id: " + req.params.id)
    }

    const user = await getUserById(req.params.id);
    
    if (user) {
        res.send(user);
    } else {
        res.status(404).send({"error":'User not found'});
    }
});

app.put('/api/publicUsers/:id', async (req: any, res: any) => {
    console.log("Want to update user with id: " + req.params.id);
    const updatedUser = await updateUser(req.params.id, req.body);

    if (updatedUser) {
        res.send(updatedUser);
    } else {
        res.status(404).send({"error":'User not found'});
    }
});

app.delete('/api/publicUsers/:id', async (req: any, res: any) => {
    console.log("Want to delete user with id: " + req.params.id);
    const deletedUser = await deleteUser(req.params.id);

    if (deletedUser) {
        res.status(200).send();
    } else {
        res.status(404).send({"error":'User not found'});
    }
});



startDB()

app.listen(port, () => {
    console.log(`[server]: Server is running at http://localhost:${port}`);
});     