import { UserModel } from '../core/user.model';

export interface UserCreateModel extends UserModel {
  password: string;
}
