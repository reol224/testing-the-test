import { Injectable } from '@nestjs/common';
import { HttpService } from '@nestjs/axios';
import { map, switchMap } from 'rxjs/operators';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable()
export class AuthService {
  private token$: BehaviorSubject<string | null> = new BehaviorSubject<
    string | null
  >(null);

  constructor(private readonly httpService: HttpService) {
    // Initialize the token on service instantiation
    this.getToken().subscribe(
      (response) => this.token$.next(response.access_token),
      (error) => console.error('Error fetching token:', error),
    );
  }

  public getToken(): Observable<any> {
    const auth0Config = {
      client_id: process.env.AUTH0_CLIENT_ID,
      client_secret: process.env.AUTH0_CLIENT_SECRET,
      audience: process.env.AUTH0_AUDIENCE,
      grant_type: 'client_credentials',
    };

    const url = process.env.AUTH0_BASE + 'oauth/token';

    return this.httpService
      .post(url, auth0Config)
      .pipe(map((response) => response.data));
  }

  unlock(): Observable<any> {
    // Use switchMap to switch to the token observable and ensure it's available
    return this.token$.pipe(
      switchMap((token) => {
        if (!token) {
          throw new Error(
            'Token not available yet. Make sure to call getToken first.',
          );
        }
        console.log('Bearer ' + token);
        const url = 'https://dev-2r8k0b3r72uke6k5.us.auth0.com/api/v2/';
        return this.httpService
          .post(url, {}, { headers: { Authorization: 'Bearer ' + token } })
          .pipe(map((response) => response.data));
      }),
    );
  }
}
