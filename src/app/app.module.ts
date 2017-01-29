import {NgModule, Type} from "@angular/core";
import {FormsModule} from "@angular/forms";
import {BrowserModule} from "@angular/platform-browser";
import {DndModule} from 'ng2-dnd';

import {HttpModule} from '@angular/http';
import {Ng2BootstrapModule} from 'ng2-bootstrap/ng2-bootstrap';

//--- Main components
import {AppComponent}   from "./app.component";

//--- All components
import {MapComponent, LayerListComponent}   from "./components/components";

//---
import {SliderWidget} from "./widgets/widgets";

//--- services
import {EventsService} from "./services/services";

//--- add rxjs operators to solve compile errors
import "rxjs/add/operator/map";
import "rxjs/add/operator/catch";

const COMPONENTS: Type<any>[] = [AppComponent, MapComponent, LayerListComponent, SliderWidget];
@NgModule({
    declarations: COMPONENTS,
    imports: [BrowserModule, FormsModule, HttpModule, Ng2BootstrapModule, DndModule.forRoot()],
    bootstrap: [AppComponent],
    providers: [EventsService]
})

export class AppModule {
}
