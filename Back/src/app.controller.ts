import { Controller, Post, Body, Get, UseGuards, Req } from '@nestjs/common';
import { AppService } from './app.service';
import { AuthDto, LoginDto } from './auth/dto/auth.dto';
import { JwtAuthGuard } from './auth/jwt.guard';
import { Request } from 'express';

@Controller('')
export class AppController {
    constructor(private readonly appService: AppService) {}

    @Get('ping')
    ping() {
        return 'pong'
    }

    @Get('about.json')
    @UseGuards(JwtAuthGuard)
    aboutJson(@Req() req) {
        return this.appService.aboutJson(req)
    }
}