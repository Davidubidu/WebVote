import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IBackLobbies, ILobbies } from '../model/lobbies.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class LobbyService {
  constructor(private httpClient: HttpClient) {}

  public getLobbies(): Observable<ILobbies[]> {
    const url = 'http://localhost:7071/api/lobbies';
    return this.httpClient.get<ILobbies[]>(url);
  }

  public getLobbiesByUserId(id: string): Observable<ILobbies[]> {
    const url = `http://localhost:7071/api/lobbies?userId=${id} `;
    return this.httpClient.get<IBackLobbies[]>(url).pipe(
      map((lobbies: IBackLobbies[]): ILobbies[] =>
        lobbies.map(
          (lobby: IBackLobbies): ILobbies => ({
            id: lobby._id,
            name: lobby.lobbyName,
            participants: lobby.participants,
            password: lobby.password,
            creatorId: lobby.creatorId,
          })
        )
      )
    );
  }
}
