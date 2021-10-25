import { Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Spot from './Spot';
import Area from './Area';

@Entity('place')
export default class Place {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  type: string;

  @Column({nullable: false})
  title: string;

  @Column({nullable: true, type: "decimal" })
  latitude: number;

  @Column({nullable: true, type: "decimal" })
  longitude: number;

  @OneToMany(type => Spot, place => Place, {onDelete: 'CASCADE'})
  spots: Promise<Spot[]>;

  @OneToMany(type => Area, place => Place, {onDelete: 'CASCADE'})
  areas: Promise<Area[]>;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_At' })
  updatedAt: Date;

}
