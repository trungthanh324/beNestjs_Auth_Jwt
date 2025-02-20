import { Exclude } from 'class-transformer';
import { Roles } from 'global/enum';
import { Column, Entity, PrimaryGeneratedColumn,UpdateDateColumn, CreateDateColumn } from 'typeorm';

@Entity({name: 'user'})
class User{
    @PrimaryGeneratedColumn()
    public id: number;
   
    @Column({unique: true})
    public email: string;
   
    @Column()
    @Exclude()
    public hashedPassword: string;
    
    @Column()
    public firstName: string; 
    
    @Column()
    public lastName: string;
    
    @UpdateDateColumn({ name: 'updated_at' })
    public updateAt: Date;

    @CreateDateColumn({ name: 'created_at' })
    public createAt: Date;

    @Exclude()
    @Column({default : Roles.USER})
    public role : Roles
}
export default User;