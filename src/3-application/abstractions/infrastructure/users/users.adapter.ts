import { Observable } from "rxjs";
import { UserOutput } from "@application/dtos/users/user.output";

export abstract class UsersAdapter {
  abstract getData (bearerToken: string): Observable<UserOutput>;
}