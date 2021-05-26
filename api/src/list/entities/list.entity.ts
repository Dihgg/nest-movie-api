import {Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToOne, ManyToMany, JoinTable, RelationId} from 'typeorm';
import {UserEntity} from "../../users/entities/user.entity";

@Entity()
export class ListEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({length: 100})
    name: string;

    @ManyToOne( type => UserEntity, user => user.lists )
    user: UserEntity;

    @Column()
    isPublic: boolean;

    @RelationId((list: ListEntity) => list.users)
    usersIds: number[];

    @ManyToMany(type => UserEntity, users => users.id)
    @JoinTable()
    users: UserEntity[];
}