import { BaseRepository } from './BaseRepository';
import { Users } from '../models/Users';

 // @ts-ignore
export class UsersRepo extends BaseRepository<Users> {


  constructor() {
    super(Users);
  }
}