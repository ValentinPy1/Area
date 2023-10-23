import { BadRequestException, Injectable } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { AuthDto, LoginDto } from './auth/dto/auth.dto';
import * as bcrypt from 'bcrypt'
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';

@Injectable()
export class AppService {
    constructor(private prisma: PrismaService, private jwt: JwtService) {}

    async aboutJson(req: Request) {
        return {
            client :{
                host: req.ip
            },
            server : {
                current_time : Math.floor(Date.now() / 1000),
            }
        }
    }
}