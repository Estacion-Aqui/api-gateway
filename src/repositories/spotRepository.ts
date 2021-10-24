
import { EntityRepository, Repository } from 'typeorm';
import { Spot } from '../models';

@EntityRepository(Spot)
export default class SpotRepository extends Repository<Spot> {
}
