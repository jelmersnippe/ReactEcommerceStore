import {Column, Entity, Index, PrimaryGeneratedColumn} from 'typeorm';

@Entity('user')
export class UserEntity {
    @PrimaryGeneratedColumn('uuid', {name: 'id'})
    id: string;

    @Column({name: 'email', unique: true, type: 'varchar'})
    email: string;

    @Column({name: 'first_name', type: 'varchar'})
    firstName: string;

    @Column({name: 'last_name', type: 'varchar'})
    lastName: string;

    @Column({name: 'password', type: 'varchar'})
    password: string;

    @Index()
    @Column({name: 'active', type: 'boolean', default: true})
    active: boolean;

    @Column({name: 'created', type: 'timestamp'})
    created: Date;

    constructor(
        user: Partial<UserEntity>
    ) {
        Object.assign(this, user);
    }
}
