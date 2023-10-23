import { Controller, Get, Req, Put, Param, UseGuards, Delete } from '@nestjs/common';
import { AdminService } from './admin.service';
import { JwtAuthGuard } from '../auth/jwt.guard';
import { AdminGuard } from './admin.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Get("users")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async getUsers(@Req() req) {
    return await this.adminService.getUsers()
  }

  @Delete("userdel/:email")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async updateUser(@Param('email') email: string, @Req() req) {
    return await this.adminService.deleteUser(req, email)
  }

  @Put("promote/:email")
  @UseGuards(JwtAuthGuard)
  async promoteUser(@Param('email') email: string, @Req() req) {
    return await this.adminService.promoteUser(req, email)
  }

  @Put("demote/:email")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async demoteUser(@Param('email') email: string, @Req() req) {
    return await this.adminService.demoteUser(req, email)
  }

  @Put("ban/:email")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async banUser(@Param('email') email: string, @Req() req) {
    return await this.adminService.banUser(req, email)
  }

  @Put("unban/:email")
  @UseGuards(JwtAuthGuard, AdminGuard)
  async unbanUser(@Param('email') email: string, @Req() req) {
    return await this.adminService.unbanUser(req, email)
  }
}
