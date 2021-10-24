import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Area from './Area';
import Spot from './Spot';

@Entity('sector')
export default class Sector {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  name: string;

  @ManyToOne(type => Area, sectors => Sector)
  area: Area;

  @OneToMany(type => Spot, sector => Sector)
  spots: Promise<Spot[]>;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_At' })
  updatedAt: Date;

}