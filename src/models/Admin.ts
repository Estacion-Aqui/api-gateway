import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import Place from './Place';

@Entity('admin')
export default class Admin {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false, unique: true})
  user: string;

  @Column({nullable: false})
  password: string;

  @Column({nullable: true})
  role: string;

  @Column({nullable: false, unique: true})
  email: string;

  @ManyToMany(type => Place)
  @JoinTable()
  places: Promise<Place[]>;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_At' })
  updatedAt: Date;

  @BeforeInsert()
  async hashPassword() {
    this.password = await bcrypt.hash(this.password, 10);
   }

}