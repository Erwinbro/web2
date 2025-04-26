import {User, IUser} from "./UserModel"


export async function getAll(): Promise<IUser[]> {
    const allUsers: IUser[] = await User.find();
    return allUsers;
}

export async function createUser(userData: any) {
    if (userData) {
        const user = new User({
            userID: userData.userID,
            firstName: userData.firstName,
            lastName: userData.lastName,
            isAdministrator: userData.isAdministrator,
            password: userData.password,
        });
        await user.save();
    }
    else {
        console.log("Have no user data")
    } }

export async function getUserById(userID: string): Promise<IUser | null> {
    const user: IUser | null = await User.findOne({ userID: userID });
    return user;
}

export async function updateUser(userID: string, userData: any): Promise<IUser | null> {
    const updatedUser: IUser | null = await User.findOneAndUpdate(
        { userID: userID },   
        userData,             
        { new: true }          
    );
    return updatedUser;
}

export async function deleteUser(userID: string) {
    const deletedUser = await User.findOneAndDelete({ userID: userID });
    return deletedUser; 
}
