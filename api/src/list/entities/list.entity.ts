import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, RelationId} from 'typeorm';
import {UserEntity} from "../../users/entities/user.entity";
import {RatingEntity} from "../../rating/entities/rating.entity";

@Entity()
export class ListEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @Column()
    isPublic: boolean;

    @ManyToOne( type => UserEntity, user => user.lists )
    user: UserEntity;

    @OneToMany( type => RatingEntity, rating => rating.user )
    ratings: RatingEntity[];

    @RelationId((list: ListEntity) => list.users)
    usersIds: number[];

    @ManyToMany(type => UserEntity, users => users.id)
    @JoinTable()
    users: UserEntity[];
}