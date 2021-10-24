import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Spot from './Spot';

@Entity('place')
export default class Place {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  type: string;

  @Column({nullable: false})
  title: string;

  @Column({nullable: false})
  amount: number;

  @Column({nullable: true})
  quantitySpots: number;

  @Column({nullable: true})
  latitude: number;

  @Column({nullable: true})
  longitude: number;

  @OneToMany(type => Spot, place => Place, {onDelete: 'CASCADE'})
  spots: Promise<Spot[]>;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_At' })
  updatedAt: Date;

}