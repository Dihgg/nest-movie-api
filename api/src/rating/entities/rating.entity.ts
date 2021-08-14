import {Column, Entity, ManyToOne, PrimaryGeneratedColumn, RelationId} from "typeorm";
import {UserEntity} from "../../users/entities/user.entity";

@Entity()
export class RatingEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    stars: number;

    @Column()
    rating: number;

    @Column()
    tmdb_id: number;

    @Column()
    comment: string;

    @RelationId( (rating: RatingEntity) => rating.user)
    userId: number;

    @ManyToOne( type => UserEntity, user => user.id )
    user: UserEntity;
}
