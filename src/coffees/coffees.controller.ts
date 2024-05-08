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

@Controller('coffees')
export class CoffeesController {
  @Get()
  findAll(@Query() paginationQuery) {
    const { limit, offset } = paginationQuery;
    return `This action returns all coffees. Limit: ${limit}, Offset: ${offset}`;
  }

  @Get('single')
  findSingle() {
    return 'This action returns a single coffee';
  }

  @Get(':id')
  findOne(@Param() params) {
    return `This action returns #${params.id} coffee`;
  }

  @Post()
  create(@Body() body) {
    return body;
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() body) {
    return `This action updates #${id} coffee`;
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return `This action removes #${id} coffee`;
  }
}
