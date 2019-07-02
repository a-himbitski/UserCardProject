import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule, routingComponents } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { UserService } from './services/user.service';
import {HttpClientModule} from '@angular/common/http';
import { LikesPipe } from './likes.pipe';
import { UserDetailComponent } from './user-detail/user-detail.component';
import { UserRatingComponent } from './user-rating/user-rating.component';
import { UserOverviewComponent } from './user-overview/user-overview.component';
 
@NgModule({
  declarations: [
    AppComponent,
    LikesPipe,
    routingComponents,
    UserDetailComponent,
    UserRatingComponent,
    UserOverviewComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
