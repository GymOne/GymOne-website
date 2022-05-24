import {APP_INITIALIZER, NgModule} from "@angular/core";
import {AppLoaderService} from "./app-loader.service";
import {environment} from "../environments/environment";
import {AppModule} from "./app.module";
import {AppComponent} from "./app.component";

export function appLoader(appLoader: AppLoaderService) {
  return async () => {
    if (environment.production) {
      await appLoader.initialize();
    }
    return Promise.resolve();
  };
}

@NgModule({
  providers: [{
    provide: APP_INITIALIZER,
    useFactory: appLoader,
    deps: [AppLoaderService],
    multi: true,
  }],
  imports: [
    AppModule
  ],
  bootstrap: [AppComponent]
})
export class AppLazyModule {

}
