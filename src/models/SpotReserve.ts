import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Place from './Place';
import Spot from './Spot';
import User from './User';

@Entity('spot_reserve')
export default class SpotReserve {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(type => Spot, spots => Spot)
  spot: Spot;

  @ManyToOne(type => Place, spots => Spot)
  place: Place;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_At' })
  updatedAt: Date;

}
