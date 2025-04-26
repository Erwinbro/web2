import {User, IUser} from "./UserModel"

export async function getAll(): Promise<IUser[]> {
    const allUsers: IUser[] = await User.find();
    return allUsers;
}

export async function createUser(userData: any) {
    if (userData) {
        const user = new User({
            name: userData.userID,
            email: userData.firstName,
            avatar: userData.password
        });
        await user.save();
    }
    else {
        console.log("Have no user data")
    }
}