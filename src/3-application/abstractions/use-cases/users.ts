import { UserOutput } from "@application/dtos/users/user.output";
import { Observable } from "rxjs";

export abstract class UsersUseCases {
  abstract getUserData(bearerToken: string): Observable<UserOutput>;
}