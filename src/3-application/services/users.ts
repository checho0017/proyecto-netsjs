import { UsersAdapter } from "@application/abstractions/infrastructure/users/users.adapter";
import { UsersUseCases } from "@application/abstractions/use-cases/users";
import { UserOutput } from "@application/dtos/users/user.output";
import { Injectable } from "@nestjs/common";
import { Observable } from "rxjs";

@Injectable()
export class UsersService implements UsersUseCases {
  constructor(
    private userAdapter: UsersAdapter,
  ) {}
  getUserData(bearerToken: string): Observable<UserOutput> {
    return this.userAdapter.getData(bearerToken);
  }
}