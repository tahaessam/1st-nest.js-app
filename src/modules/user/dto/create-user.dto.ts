import { UserRole } from '../../../common/decorators/enum/role.enum';
import { provider_role } from '../../../common/decorators/enum/provider.enum';

export class CreateUserDto {
  username!: string;
  password!: string;
  email!: string;
  phoneNumber?: string;
  provider?: provider_role;
  role?: UserRole;
  isSuperAdmin?: boolean;
  storeName?: string;
  storeDescription?: string;
  isVerified?: boolean;
  address?: string;
}
