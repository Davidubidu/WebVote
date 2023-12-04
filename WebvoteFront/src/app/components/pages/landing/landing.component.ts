import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ICardData } from '../../../model/cardList.interface';
import { ILobbies } from '../../../model/lobbies.interface';
import { map, of, switchMap } from 'rxjs';
import { LobbyService } from '../../../services/lobby.service';
import { UserService } from '../../../services/user.service';
import { IUser } from '../../../model/user.interface';

@Component({
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss',
})
export class LandingComponent implements OnInit {
  public buttonName = 'Go To Session';
  public sessions: ILobbies[] = [];
  public sessionCardList: ICardData[] = [];

  constructor(
    private router: Router,
    private userService: UserService,
    private lobbyService: LobbyService
  ) {}

  ngOnInit(): void {
    // fetch data from backend
    // of([
    //   {
    //     id: '1',
    //     name: 'Session 1',
    //     participants: ['user1'],
    //     password: '12345asder',
    //   },
    //   {
    //     id: '2',
    //     name: 'Session 2',
    //     participants: ['user1', 'user2', 'user3'],
    //     password: '12345asder',
    //   },
    //   {
    //     id: '3',
    //     name: 'Session 3',
    //     participants: ['user1'],
    //   },
    // ])
    // .pipe(
    //   map((sessions: ISession[]) => {
    //     return sessions.filter((session: ISession) => session.password);
    //   })
    // )
    this.userService
      .getUsers()
      .pipe(
        switchMap((users: IUser[]) => {
          const mockId = '6565b38eeac093c857f807f4';
          const currentUser = users.find(
            (user: IUser) => user.id === mockId
          )?.id;

          return this.lobbyService.getLobbiesByUserId(
            currentUser ? currentUser : mockId
          );
        })
      )
      .subscribe((sessions: ILobbies[]) => {
        this.sessions = sessions;

        this.sessionCardList = sessions.map((session: ILobbies): ICardData => {
          return {
            title: session.name,
            id: session.id,
          };
        });
      });
  }

  // afterViewInit const a = getElement('id')

  // onDestroy

  public onSessionClicked(id: string): void {
    this.router.navigate(['session']);
  }

  public sessionButtonClicked(): void {
    this.router.navigate(['session']);
  }
}
