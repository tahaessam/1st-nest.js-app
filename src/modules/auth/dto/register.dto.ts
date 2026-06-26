import { UserRole } from '../../../common/enum/role.enum';
import { provider_role } from '../../../common/enum/provider.enum';

export class RegisterDto {
  email!: string;
  phoneNumber!: string;
  password!: string;
  username!: string;
  provider!: provider_role;
  role!: UserRole;
}
