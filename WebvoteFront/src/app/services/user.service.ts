import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBackUser, IUser } from '../model/user.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private httpClient: HttpClient) {}

  public getUsers(): Observable<IUser[]> {
    const url = 'http://localhost:7071/api/users';
    return this.httpClient.get(url) as Observable<IUser[]>;
  }

  // public getUserByUserId(id: string): Observable<IUser[]> {
  //   const url = `http://localhost:7071/api/lobbies?_id=${id} `;
  //   return this.httpClient.get<IBackUser[]>(url).pipe(
  //     map((lobbies: IBackUser[]): IUser[] =>
  //       lobbies.map(
  //         (lobby: IBackUser): IUser => ({
  //           id: lobby._id,
  //           name: lobby.lobbyName,
  //           participants: lobby.participants,
  //           password: lobby.password,
  //           creatorId: lobby.creatorId,
  //         })
  //       )
  //     )
  //   ) as Observable<IUser[]>;
  // }
}
