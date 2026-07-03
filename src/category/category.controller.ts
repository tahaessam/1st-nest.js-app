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
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { CategoryQueryDto } from './dto/category-query.dto';
import { Roles } from '../common/decorators/roles.decorator';
import { UserRole } from '../common/enums/role.enum';
import { Permissions } from '../common/decorators/permissions.decorator';
import { MODULE_PERMISSIONS } from '../Permissions/permissions.catalog';

@Controller('category')
export class CategoryController {
  constructor(private readonly categoryService: CategoryService) {}

  @Post()
  @Roles(UserRole.admin)
  @Permissions(MODULE_PERMISSIONS.category.create)
  create(@Body() createCategoryDto: CreateCategoryDto) {
    return this.categoryService.create(createCategoryDto);
  }

  @Get()
  @Roles(UserRole.admin, UserRole.seller, UserRole.user)
  @Permissions(MODULE_PERMISSIONS.category.read)
  findAll(@Query() query: CategoryQueryDto) {
    return this.categoryService.findAll(query);
  }

  @Get(':id')
  @Roles(UserRole.admin, UserRole.seller, UserRole.user)
  @Permissions(MODULE_PERMISSIONS.category.read)
  findOne(@Param('id') id: string) {
    return this.categoryService.findOne(id);
  }

  @Patch(':id')
  @Roles(UserRole.admin)
  @Permissions(MODULE_PERMISSIONS.category.update)
  update(
    @Param('id') id: string,
    @Body() updateCategoryDto: UpdateCategoryDto,
  ) {
    return this.categoryService.update(id, updateCategoryDto);
  }

  @Delete(':id')
  @Roles(UserRole.admin)
  @Permissions(MODULE_PERMISSIONS.category.delete)
  remove(@Param('id') id: string) {
    return this.categoryService.remove(id);
  }
}
