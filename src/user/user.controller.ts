import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { Permissions } from '../common/decorators/permissions.decorator';
import { UserRole } from '../common/enums/role.enum';
import { MODULE_PERMISSIONS } from '../Permissions/permissions.catalog';

@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Post()
  @Roles(UserRole.admin)
  @Permissions(MODULE_PERMISSIONS.user.create)
  create(@Body() createUserDto: CreateUserDto) {
    return this.userService.create(createUserDto);
  }

  @Get()
  @Roles(UserRole.admin, UserRole.seller, UserRole.user)
  @Permissions(MODULE_PERMISSIONS.user.read)
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.seller, UserRole.user)
  @Permissions(MODULE_PERMISSIONS.user.read)
  findOne(@Param('id') id: string) {
    return this.userService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.admin)
  @Permissions(MODULE_PERMISSIONS.user.update)
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(id, updateUserDto);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  @Permissions(MODULE_PERMISSIONS.user.delete)
  remove(@Param('id') id: string) {
    return this.userService.remove(id);
  }
}
