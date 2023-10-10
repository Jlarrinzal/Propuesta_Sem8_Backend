import mongoose, { Document, ObjectId, Schema } from 'mongoose';

export interface IUser {
    username: string;
    email: string;
    password: string;
}

export interface UserModel extends IUser, Document {}

const UserSchema: Schema = new Schema(
    {
        username: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true } 
    },
    {
        versionKey: false
    }
);

export default mongoose.model<UserModel>('User', UserSchema);
