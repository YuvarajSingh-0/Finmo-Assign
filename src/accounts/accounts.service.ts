import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Account } from 'src/schemas/accounts.schema';
import { User } from 'src/schemas/users.schema';
import * as bcrypt from 'bcrypt';

@Injectable()
export class AccountsService {
    constructor(@InjectModel('Users') private usersModel: Model<User>, @InjectModel('Accounts') private readonly accountsModel: Model<Account>) { }
    async topUp(userId: string, amount: number, currency: string) {
        const res = await this.accountsModel.findOne({ userId: userId });
        if (!res) {
            const balances = new Map<string, number>();
            balances.set(currency, amount);
            const newAccount = new this.accountsModel({
                userId: userId,
                balances: balances
            });
            newAccount.save();
        } else {
            const balances = res.balances;
            if (balances.has(currency)) {
                balances.set(currency, Number(balances.get(currency)) + amount);
            } else {
                balances.set(currency, amount);
            }
            res.save();
            return `Account ${userId} has been topped up with ${amount} ${currency}`;
        }
    }
    async register(userData: { username: string, password: string }) {
        const res = await this.usersModel.find({ username: userData.username });
        if (res.length === 0) {
            const newUser = new this.usersModel({
                username: userData.username,
                password: bcrypt.hashSync(userData.password, 10)
            });
            await newUser.save();
            const newAccount = new this.accountsModel({
                userId: newUser._id,
                balances: new Map<string, number>()
            });
            await newAccount.save();

            return `Account ${userData.username} has been created`;
        } else {
            return `Account ${userData.username} already exists`;
        }
    }

    async getBalance(userId: string, currency: string) {
        const res = await this.accountsModel.findOne({ userId
        });
        if (!res) {
            throw new Error(`Account ${userId} does not exist`);
        } else {
            const balances = res.balances;
            if (balances.has(currency)) {
                return balances.get(currency);
            } else {
                return 0;
            }
        }
    }
    async getBalances(userId: string) {
        const res = await this.accountsModel.findOne({ userId });
        if (!res) {
            return `Account ${userId} does not exist`;
        } else {
            return res.balances;
        }
    }
}