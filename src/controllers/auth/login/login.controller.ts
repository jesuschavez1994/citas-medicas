import { Controller, Request, Post, UseGuards, Res, HttpStatus } from '@nestjs/common';
import { Response } from 'express';
import { AuthService } from 'src/core/services/auth/auth.service';
import { LocalAuthGuard } from 'src/core/services/auth/local-auth.guard';

@Controller()
export class LoginController {
    constructor(private _authService: AuthService) {}
   @UseGuards(LocalAuthGuard)
    @Post('auth/login')
    async login(@Request() req, @Res() res: Response) {
        return  res.status(HttpStatus.OK).json(
            await this._authService.login(req.user),
        )
    }
}
