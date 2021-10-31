import { Column, CreateDateColumn, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Place from './Place';
import Sector from './Sector';
import SpotRequest from './SpotRequest';

@Entity('spot')
export default class Spot {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: false})
  title: string;

  @Column({nullable: true})
  status: boolean;

  @Column({nullable: true})
  plate: string;

  @Column({ name: 'sensor_id', nullable: false })
  sensorId: string;

  @ManyToOne(type => Sector, spots => Spot, { eager: false })
  sector: Sector;

  @OneToMany(type => SpotRequest, spot => Spot, {onDelete: 'SET NULL'})
  spotRequests: Promise<SpotRequest[]> ;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_At' })
  updatedAt: Date;

}
