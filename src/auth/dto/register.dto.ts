import { UserRole } from '../../common/enums/role.enum';
import { provider_role } from '../../common/enums/provider.enum';

export class RegisterDto {
  email!: string;
  phoneNumber!: string;
  password!: string;
  username!: string;
  provider!: provider_role;
  role!: UserRole;
}
