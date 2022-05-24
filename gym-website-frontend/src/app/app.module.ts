import {APP_INITIALIZER, CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA} from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { HeaderComponent } from './header/header.component';
import { ContactComponent } from './contact/contact.component';
import { AboutComponent } from './about/about.component';
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import {HttpClientModule} from "@angular/common/http";
import {AuthGuard} from "./auth/guard/auth.guard";
import { UserNavComponent } from './user-nav/user-nav.component';
import { TrackingComponent } from './tracking/tracking.component';
import {NgxsModule} from "@ngxs/store";
import {environment} from "../environments/environment";
import {NgxsStoragePluginModule} from "@ngxs/storage-plugin";
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import {AuthState} from "./shared/stores/states/auth.state";
import {TrackingState} from "./shared/stores/states/tracking.state";
import {ExerciseState} from "./shared/stores/states/exercise.state";
import { ProfileComponent } from './profile/profile.component';
import {FriendComponent} from "./friend/friend.component";
import {SocketIoModule, SocketIoConfig} from "ngx-socket-io";
import {SimpleNotificationsModule} from "angular2-notifications";
import {BrowserAnimationsModule} from "@angular/platform-browser/animations";
import {AppLoaderService} from "./app-loader.service";

export const socketConfigOptions:SocketIoConfig = {
  options: {}, url: environment.api
}

export function appLoader(appLoader: AppLoaderService) {
  return async () => {
    if (environment.production) {
      await appLoader.initialize();
    }
    return Promise.resolve();
  };
}

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    HeaderComponent,
    ContactComponent,
    AboutComponent,
    UserNavComponent,
    TrackingComponent,
    ProfileComponent,
    FriendComponent,
  ],
  providers: [AuthGuard,{
    provide: APP_INITIALIZER,
    useFactory: appLoader,
    deps: [AppLoaderService],
    multi: true,
  }],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
    NgbModule,
    SimpleNotificationsModule.forRoot(),
    BrowserAnimationsModule,
    NgxsModule.forRoot([AuthState,TrackingState,ExerciseState], {
      developmentMode: !environment.production
    }),
    NgxsStoragePluginModule.forRoot({
      key: 'auth.user'
    }),
    SocketIoModule.forRoot({options: {}, url: environment.api})
  ],
  bootstrap: [AppComponent]
})
export class AppModule {

}
