import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from 'typeorm';
import Spot from './Spot';
import User from './User';

@Entity('spot_request')
export default class SpotRequest {

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({nullable: true})
  status: string;

  @ManyToOne(type => Spot, spotRequests => SpotRequest)
  @JoinColumn()
  spot: Spot;

  @ManyToOne(type => User, spotRequests => SpotRequest)
  @JoinColumn()
  user: User;

  @CreateDateColumn({ name: 'created_At' })
  createdAt: Date;

  @UpdateDateColumn({ name: 'update_At' })
  updatedAt: Date;

}