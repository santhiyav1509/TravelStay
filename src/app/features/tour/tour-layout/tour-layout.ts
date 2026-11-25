import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-tour-layout',
  imports: [RouterOutlet, RouterLink, RouterLinkActive],
  templateUrl: './tour-layout.html',
  styleUrl: './tour-layout.css',
})
export class TourLayout {}