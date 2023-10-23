import { Controller, Post, Body, Get, UseGuards, Req, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthDto, LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) { }

  @Post('register')
  register(@Body() dto: AuthDto, @Req() req, @Res() res) {
    return this.authService.register(dto, req, res)
  }

  @Post('login')
  login(@Body() dto: LoginDto, @Req() req, @Res() res) {
    return this.authService.login(dto, req, res)
  }

  @Get('logout')
  @UseGuards(JwtAuthGuard)
  logout(@Req() req, @Res() res) {
    return this.authService.logout(req, res)
  }

  @Get('me')
  @UseGuards(JwtAuthGuard)
  getMe(@Req() req) {
    return this.authService.Me(req)
  }

  @Post('changepswd')
  @UseGuards(JwtAuthGuard)
  changePswd(@Body() dto, @Req() req) {
    return this.authService.changePswd(dto, req)
  }

  @Get('cookie')
  addcooo(@Req() req, @Res() res) {
    res.cookie('authorization', 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbnJAZ21haWwuY29tIiwiaWQiOiIyMzkwZmFjOC0yOTNmLTQ5OTUtOWQ3Zi0yN2I4MWU1NWJmOGQiLCJpYXQiOjE2OTc0NTE0MDV9.EOeYxoGKqvt9dFw-oUotMbX312hRYOyu0XCizHzHJ6w')
    return res.send("ok")
  }
}
