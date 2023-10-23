import { Body, Controller, Get, Post, Param, Res, Req, Query, UseGuards } from '@nestjs/common';
import { Oauth2Service } from './oauth2.service'
import { JwtAuthGuard } from '../auth/jwt.guard';
import { Request, Response } from 'express';

@Controller('oauth2')
export class Oauth2Controller {
  constructor(private readonly oauth2Service: Oauth2Service) {}

  @Get('discordbot/callback')
  @UseGuards(JwtAuthGuard)
  callback(@Query('code') code: string, @Query('guild_id') guild_id: string, @Query('state') userId: string, @Req() req, @Res() res) {
    return this.oauth2Service.callback(code, res, req, guild_id, userId);
  }

  @Get('discordbot/redirect')
  @UseGuards(JwtAuthGuard)
  redirect(@Res() res, @Req() req) {
    return this.oauth2Service.redirec(res, req);
  }

  @Get('microsoft/callback')
  microsoftCallback(@Query('code') code: string, @Query('state') userId: string, @Req() req, @Res() res) {
    return this.oauth2Service.microsoftCallback(code, res, req, userId)
  }

  @Get('microsoft/redirect')
  @UseGuards(JwtAuthGuard)
  microsoftRedirect(@Res() res, @Req() req) {
    return this.oauth2Service.microsoftRedirect(res, req);
  }

  @Get('google/callback')
  googleCallback(@Query('code') code: string, @Query('state') userId: string, @Req() req, @Res() res) {
    return this.oauth2Service.googleCallback(code, res, req, userId)
  }

  @Get('google/redirect')
  @UseGuards(JwtAuthGuard)
  googleRedirect(@Res() res, @Req() req) {
    return this.oauth2Service.googleRedirect(res, req);
  }

  @Get('oauth2data/:name')
  @UseGuards(JwtAuthGuard)
  async getOauth2Data(@Param('name') name: string, @Req() req) {
    return this.oauth2Service.getOauth2Data(name, req);
  }
}
