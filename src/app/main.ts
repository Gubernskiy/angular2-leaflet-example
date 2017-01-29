import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { enableProdMode } from '@angular/core';
import { AppModule} from './app.module';
import { environment } from './environment';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/toPromise';

if (environment.production) {
    enableProdMode();
}

platformBrowserDynamic().bootstrapModule(AppModule);