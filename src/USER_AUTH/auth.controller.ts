import { Body, Controller, Post } from "@nestjs/common";
import { ApiBearerAuth, ApiCreatedResponse, ApiTags } from "@nestjs/swagger";

import { login_Request, login_phone, login_google } from "./dto/login.dto";
import { signup_Request } from "./dto/signup.dto";
import { DataResponseDto } from "../shared/dto/data-response-dto";

import { AuthService } from "./auth.service";

@Controller("auth")
@ApiTags("auth")
export class AuthController {
  constructor(private readonly AuthService: AuthService) {}

  @Post("/signup")
  @ApiCreatedResponse({ type: DataResponseDto })
  @ApiBearerAuth()
  signup(@Body() signup_Request: signup_Request): any {
    return this.AuthService.signup(signup_Request);
  }

  @Post("/mail-verify")
  @ApiCreatedResponse({ type: DataResponseDto })
  @ApiBearerAuth()
  mailVerify(@Body() mail: any): any {
    return this.AuthService.mailVerify(mail);
  }

  @Post("/mail-verifyLink")
  @ApiCreatedResponse({ type: DataResponseDto })
  @ApiBearerAuth()
  MailVeifyLink(@Body() mail: any): any {
    return this.AuthService.mailVerifyLink(mail);
  }

  @Post("/login")
  @ApiCreatedResponse({ type: DataResponseDto })
  @ApiBearerAuth()
  async login(@Body() login_Request: login_Request) {
    return await this.AuthService.login(login_Request);
  }

  @Post("/phone-login")
  @ApiCreatedResponse({ type: DataResponseDto })
  @ApiBearerAuth()
  phoneLogin(@Body() login_phone: login_phone): any {
    return this.AuthService.phoneLogin(login_phone);
  }

  @Post("/google-login")
  @ApiCreatedResponse({ type: DataResponseDto })
  @ApiBearerAuth()
  googleLogin(@Body() login_google: login_google): any {
    return this.AuthService.googleLogin(login_google);
  }

  @Post("/forgot-password")
  @ApiCreatedResponse({ type: DataResponseDto })
  @ApiBearerAuth()
  forgot(@Body() signup_Request: signup_Request): any {
    return this.AuthService.signup(signup_Request);
  }
}
