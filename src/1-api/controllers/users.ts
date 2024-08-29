import { BadRequestException, Controller, Get, Req, Version } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { Observable } from "rxjs";
import { UsersUseCases } from "@application/abstractions/use-cases/users";
import { UserOutput } from "@application/dtos/users/user.output";

@ApiTags('Users')
@Controller()
export class UsersController {
  constructor(
    private userUseCases: UsersUseCases,
  ) {}

  @Version(['1.0'])
  @Get('users/current-user')
  get(@Req() request: Request): Observable<UserOutput> {
    const token: string | null = request.headers['authorization'] ? request.headers['authorization'] : null;
    if (token == null) throw new BadRequestException();
    return this.userUseCases.getUserData(token);
  }
}