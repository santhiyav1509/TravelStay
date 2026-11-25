import { Routes } from '@angular/router';
import { TourLayout } from './features/tour/tour-layout/tour-layout';
import { TourForm } from './features/tour/tour-form/tour-form';
import { TourDetails } from './features/tour/tour-details/tour-details';
import { RoomLayout } from './features/room/room-layout/room-layout';
import { RoomForm } from './features/room/room-form/room-form';
import { RoomDetails } from './features/room/room-details/room-details';

export const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'tour' },
  {path: 'tour',component: TourLayout,

    children: [
      { path: '', component: TourForm },
      { path: 'details', component: TourDetails },
      { path: 'edit/:id', component: TourForm },
    ],

  },
  {
    path: 'rooms',component: RoomLayout,

    children: [
      { path: '', component: RoomForm },
      { path: 'details', component: RoomDetails },
      { path: 'edit/:id', component: RoomForm },
    ],
  },
  { path: '**', redirectTo: 'tour' },
];