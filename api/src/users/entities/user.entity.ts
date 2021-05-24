import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import {IUser} from "./user.interface";

@Entity()
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, unique: true})
    username: string;

    @Column()
    password: string;
}