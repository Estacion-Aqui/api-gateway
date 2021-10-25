import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Sector from './Sector';
import Place from './Place';

@Entity('area')
export default class Area {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  name: string;

  @Column({nullable: false})
  code: string;

  @ManyToOne(type => Place, areas => Area)
  place: Place;

  @OneToMany(type => Sector, area => Area)
  sectors: Promise<Sector[]>;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_At' })
  updatedAt: Date;

}
