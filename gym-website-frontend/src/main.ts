import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';

import { AppModule } from './app/app.module';
import { environment } from './environments/environment';
import {AppLazyModule} from "./app/app-lazy-module";

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppLazyModule)
  .catch(err => console.error(err));
