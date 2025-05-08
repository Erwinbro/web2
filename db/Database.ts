import { connect } from 'mongoose';
import { createUser } from '../endpoints/user/UserService';

export async function startDB(){
    console.log("Connect database")
    await connect('mongodb://127.0.0.1:27017/student-portal');
    console.log("connected db")

    await createUser ({"userID":"admin",
    "firstName": "Sucksi",
    "lastName": "Sunkist",
    "password": "123"});

}
