import {Controller, Get, Post, Body, Patch, Param, Delete, UseGuards, Request} from '@nestjs/common';
import { ListService } from './list.service';
import { CreateListDto } from './dto/create-list.dto';
import { UpdateListDto } from './dto/update-list.dto';
import {JwtAuthGuard} from "../auth/guards/jwt-auth.guard";
import {
  ApiCreatedResponse,
  ApiNotFoundResponse, ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnprocessableEntityResponse
} from "@nestjs/swagger";

@ApiTags('list')
@UseGuards(JwtAuthGuard)
@Controller('v1/list')
export class ListController {
  constructor(private readonly listService: ListService) {}

  @ApiOperation({ summary: 'Create a user movie list' })
  @ApiCreatedResponse({ description: "List Created" })
  @ApiUnprocessableEntityResponse({ description: "Error in Request" })
  @Post()
  create(@Request() req, @Body() body: CreateListDto) {
    return this.listService.create(req.user.id, body);
  }

  @ApiOperation({ summary: 'Get All Lists by the user' })
  @Get()
  findAll(@Request() req) {
    return this.listService.findAll(req.user.id as number);
  }

  @ApiOperation({ summary: 'Get a User List' })
  @ApiOkResponse( { description: 'List found' } )
  @ApiNotFoundResponse({ description: 'List not found' })
  @Get(':id')
  findOne(@Request() req, @Param('id') id: string) {
    return this.listService.findOne(req.user.id as number, +id);
  }

  @ApiOperation({ summary: 'Update a User List' })
  @ApiOkResponse({ description: 'Updated list' })
  @ApiNotFoundResponse({ description: 'List not found' })
  @Patch(':id')
  update(@Request() req, @Param('id') id: string, @Body() updateListDto: UpdateListDto) {
    return this.listService.update(req.user.id as number, +id, updateListDto);
  }

  @ApiOperation({ summary: 'Remove a User List' })
  @ApiOkResponse( { description: 'List deleted'})
  @ApiNotFoundResponse({ description: 'List not found' })
  @Delete(':id')
  remove(@Request() req, @Param('id') id: string) {
    return this.listService.remove(req.user.id as number, +id);
  }
}
