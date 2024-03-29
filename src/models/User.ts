import { BeforeInsert, BeforeUpdate, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import bcrypt from 'bcrypt'
import SpotRequest from './SpotRequest';
import { IsEmail } from 'class-validator';

@Entity('user')
export default class User {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false, unique: true})
  user: string;

  @Column({nullable: false})
  password: string;

  @Column({nullable: true})
  car: string;

  @Column({nullable: true})
  plate: string;

  @IsEmail()
  @Column({nullable: false, unique: true})
  email: string;

  @OneToMany(type => SpotRequest, user => User, {onDelete: 'CASCADE'})
  spotRequests: Promise<SpotRequest[]>;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_At' })
  updatedAt: Date;

}
