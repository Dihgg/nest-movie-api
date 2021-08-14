import {Entity, Column, PrimaryGeneratedColumn, ManyToOne, OneToMany} from 'typeorm';
import {IUser} from "./user.interface";
import {ListEntity} from "../../list/entities/list.entity";
import {RatingEntity} from "../../rating/entities/rating.entity";

@Entity()
export class UserEntity implements IUser {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100, unique: true})
    username: string;

    @Column()
    password: string;

    @OneToMany( type => ListEntity, list => list.user )
    lists: ListEntity[];

    @OneToMany( type => RatingEntity, rating => rating.user )
    ratings: RatingEntity[];
}