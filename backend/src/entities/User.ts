import {Entity, 
        PrimaryGeneratedColumn, 
        Column, 
        BeforeInsert, 
        BeforeUpdate} 
        from 'typeorm';
import bcrypt from "bcrypt";

@Entity()
export class User{
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    fullName: string;

    @Column({unique: true})
    email: string;

    @Column()
    password: string;

    public async comparePassword(password: string){
        return await bcrypt.compare(password, this.password);
    }

    @BeforeInsert()
    @BeforeUpdate()
    public async hashPassword(){
        if(this.password){
            this.password = await bcrypt.hash(this.password, 10);
        };
    };
};