
import { EntityRepository, Repository } from 'typeorm';
import { User } from '../models';

@EntityRepository(User)
export default class UserRepository extends Repository<User> {
  public async findByUsername(username: string): Promise<User> {
    return this.findOneOrFail({
      where: {
        user: username
      }
    })
  }

  public async findByEmail(email: string): Promise<User> {
    return this.findOneOrFail({
      where: {
        email: email
      }
    })
  }
}
