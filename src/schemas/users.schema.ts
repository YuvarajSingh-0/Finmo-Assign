// user.schema.ts
import { Schema } from 'mongoose';

export const UserSchema = new Schema({
    username: String,
    password: String,
});

export type User = {
    username: string;
    password: string;
}