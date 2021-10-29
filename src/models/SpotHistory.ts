import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Spot from './Spot';
import User from './User';

@Entity('spot_history')
export default class SpotHistory {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => User, spots => Spot)
  user: User;

  @ManyToOne(type => Spot, spots => Spot)
  spot: Spot;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_At' })
  updatedAt: Date;

}
