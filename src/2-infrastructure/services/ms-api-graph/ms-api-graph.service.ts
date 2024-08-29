import { UsersAdapter } from "@application/abstractions/infrastructure/users/users.adapter";
import { UserOutput } from "@application/dtos/users/user.output";
import { Injectable } from "@nestjs/common";
import { Observable, of } from "rxjs";

enum Role {
  OPERATOR = "OPERATOR",
  ADMINISTRATOR = "ADMINISTRATOR",
}

@Injectable()
export class MsApiGraphService implements UsersAdapter {
  getData(bearerToken: string): Observable<UserOutput> {
    return of({name: 'Nombre de usuario', role: Role.ADMINISTRATOR});
  }
}