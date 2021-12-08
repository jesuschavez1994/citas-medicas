import { Controller, Request, Post, UseGuards, Res } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { AuthService } from 'src/core/services/auth/auth.service';
import { LocalAuthGuard } from 'src/core/services/auth/local-auth.guard';

@Controller()
export class LoginController {
    constructor(private _authService: AuthService) {}
   // @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req, @Res() res) {
        return this._authService.login(req.user);
    }
}
