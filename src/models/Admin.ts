import { BeforeInsert, Column, CreateDateColumn, Entity, JoinTable, ManyToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import bcrypt from 'bcrypt';
import Place from './Place';
import { IsEmail, IsNotEmpty, IsString, MaxLength, MinLength } from 'class-validator';

@Entity('admin')
export default class Admin {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @IsString()
  @MinLength(3)
  @MaxLength(20)
  @Column({nullable: false, unique: true})
  user: string;

  @IsString()
  @MinLength(4)
  @MaxLength(20)
  @Column({nullable: false})
  password: string;

  @IsString()
  @Column({nullable: true})
  role: string;

  @IsEmail()
  @IsNotEmpty()
  @Column({nullable: false, unique: true})
  email: string;

  @ManyToMany(type => Place, { eager: true })
  @JoinTable()
  places: Promise<Place[]>;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_At' })
  updatedAt: Date;

}