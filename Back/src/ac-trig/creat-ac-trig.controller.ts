import { Controller, Post, Body, Req, UseGuards, Get, Param } from '@nestjs/common';
import { CreatAcTrigService } from './creat-ac-trig.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import {NewActionDto, NewTriggerDto, NewServiceDto} from './dto/ac-trig.dto';

@Controller('actrig')
export class CreatAcTrigController {
  constructor(private readonly creatAcTrigService: CreatAcTrigService) {}

  @Post("addaction")
  @UseGuards(JwtAuthGuard)
  async newAction(@Body() dto: NewActionDto, @Req() req) {
    return this.creatAcTrigService.newAction(dto, req);
  }

  @Post("addtrigger")
  @UseGuards(JwtAuthGuard)
  async newTrigger(@Body() dto: NewTriggerDto, @Req() req) {
    return this.creatAcTrigService.newTrigger(dto, req);
  }

  @Get("getactions")
  @UseGuards(JwtAuthGuard)
  async getActions(@Req() req) {
    return this.creatAcTrigService.getActions(req);
  }

  @Get("gettriggers")
  @UseGuards(JwtAuthGuard)
  async getTriggers(@Req() req) {
    return this.creatAcTrigService.getTriggers(req);
  }

  @Post("addservice")
  @UseGuards(JwtAuthGuard)
  async addService(@Body() dto: NewServiceDto, @Req() req) {
    return this.creatAcTrigService.addService(dto, req);
  }

  @Get("getservices")
  @UseGuards(JwtAuthGuard)
  async getServices(@Req() req) {
    return this.creatAcTrigService.getServices(req);
  }

  @Get("getactions/:service")
  @UseGuards(JwtAuthGuard)
  async getAction(@Param('service') name: string, @Req() req) {
    return this.creatAcTrigService.getActionOfService(name, req);
  }

  @Get("gettriggers/:service")
  @UseGuards(JwtAuthGuard)
  async getTrigger(@Param('service') name: string, @Req() req) {
    return this.creatAcTrigService.getTriggerOfService(name, req);
  }

  @Get("deleteall")
  @UseGuards(JwtAuthGuard)
  async deleteAll(@Req() req) {
    return this.creatAcTrigService.deleteAll(req);
  }
}
