import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { BrandService } from './brand.service';
import { CreateBrandDto } from './dto/create-brand.dto';
import { UpdateBrandDto } from './dto/update-brand.dto';
import { BrandQueryDto } from './dto/brand-query.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { Permissions } from '../common/decorators/permissions.decorator';
import { MODULE_PERMISSIONS } from '../Permissions/permissions.catalog';

@Controller('brand')
export class BrandController {
  constructor(private readonly brandService: BrandService) {}

  @Post()
  @Roles(UserRole.admin)
  @Permissions(MODULE_PERMISSIONS.brand.create)
  create(@Body() createBrandDto: CreateBrandDto) {
    return this.brandService.create(createBrandDto);
  }

  @Get()
  @Roles(UserRole.admin, UserRole.seller, UserRole.user)
  @Permissions(MODULE_PERMISSIONS.brand.read)
  findAll(@Query() query: BrandQueryDto) {
    return this.brandService.findAll(query);
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.seller, UserRole.user)
  @Permissions(MODULE_PERMISSIONS.brand.read)
  findOne(@Param('id') id: string) {
    return this.brandService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.admin)
  @Permissions(MODULE_PERMISSIONS.brand.update)
  update(@Param('id') id: string, @Body() updateBrandDto: UpdateBrandDto) {
    return this.brandService.update(id, updateBrandDto);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  @Permissions(MODULE_PERMISSIONS.brand.delete)
  remove(@Param('id') id: string) {
    return this.brandService.remove(id);
  }
}
