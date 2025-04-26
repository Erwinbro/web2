import { User, IUser } from "./UserModel";
import bcrypt from 'bcryptjs';


const hashPassword = async (password: string): Promise<string> => {
    const salt = await bcrypt.genSalt(10); 
    const hashedPassword = await bcrypt.hash(password, salt); 
    return hashedPassword;
};


export async function createUser(userData: any) {
    if (userData) {

        const hashedPassword = await hashPassword(userData.password);
        
        const user = new User({
            userID: userData.userID,
            firstName: userData.firstName,
            lastName: userData.lastName,
            isAdministrator: userData.isAdministrator,
            password: hashedPassword, 
        });
        const existingUser = await User.findOne({ userID: userData.userID });
        if (existingUser) {
            throw new Error(`User with userID ${userData.userID} already exists.`);
        }
        await user.save();
    } else {
        console.log("No user data provided");
    }
}


export async function getUserById(userID: string): Promise<IUser | null> {
    const user: IUser | null = await User.findOne({ userID: userID });
    return user;
}


export async function updateUser(userID: string, userData: any): Promise<IUser | null> {

    if (userData.password) {
        userData.password = await hashPassword(userData.password);
    }

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


export async function getAll(): Promise<IUser[]> {
    const allUsers: IUser[] = await User.find();
    return allUsers;
}
