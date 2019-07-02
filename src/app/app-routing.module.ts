import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { UserCardComponent } from './user-card/user-card.component';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
import { UserRatingComponent } from './user-rating/user-rating.component';

const routes: Routes = [
  {path: '',redirectTo:'/home', pathMatch:'full'},
  {path: 'home', component:HomeComponent},
  {path: 'users', component:UserCardComponent},
  {
    path: 'users/:id',
    component:UserDetailComponent,
    children: [
      {path: '', redirectTo:'overview', pathMatch:'full'},
      {path:'overview', component: UserOverviewComponent},
      {path:'raiting', component: UserRatingComponent}
    ]
  },
  {path: "**", component:HomeComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
export const routingComponents = [
  HomeComponent,
  UserCardComponent,
  UserDetailComponent,
  UserOverviewComponent,
  UserRatingComponent]