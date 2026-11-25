import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-room-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './room-layout.html',
  styleUrl: './room-layout.css',
})
export class RoomLayout {}