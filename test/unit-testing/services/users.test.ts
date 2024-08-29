import { UsersService } from "@application/services/users";
import { UsersAdapter } from '@application/abstractions/infrastructure/users/users.adapter';
import { Test } from "@nestjs/testing";
import { Observable, of } from "rxjs";
import { UserOutput } from "@application/dtos/users/user.output";
import { Role } from "@application/dtos/enumerations/roles";

describe('UserService', () => {
  const validToken: string = 'VALID_TOKEN';
  let usersService: UsersService;
  
  beforeEach(async () => {
    const mockDataForValidToken: UserOutput = {name: 'Fabian Ponce', role: Role.ADMINISTRATOR};
    const mockDataForInvalidToken: UserOutput = {name: 'Operador Anónimo', role: Role.OPERATOR};
    const module = await Test.createTestingModule({
      imports: [],
      providers: [
        UsersService,
        {
          provide: UsersAdapter,
          useFactory: () => ({
            getData: jest.fn((token: string): Observable<UserOutput> => {
              if (token == validToken) return of(mockDataForValidToken);
              else return of(mockDataForInvalidToken);
            }),
          })
        },
      ]
    }).compile();

    usersService = await module.get(UsersService);
  });

  describe('getUserData()', () => {
    it('returns OPERATOR role sending invalid token', (done) => {
      usersService.getUserData('FAKE_TOKEN').subscribe(result => {
        expect(result.role == Role.OPERATOR).toBe(true);
        done();
      });
    });
    
    it('returns ADMINISTRATOR role sending valid token', (done) => {
      usersService.getUserData(validToken).subscribe(result => {
        expect(result.role == Role.ADMINISTRATOR).toBe(true);
        done();
      });
    });
  });
});