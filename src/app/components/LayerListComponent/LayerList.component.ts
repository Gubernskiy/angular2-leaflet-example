import {Component} from "@angular/core";
import {Layer} from "../../classes/classes";
import {EventsService} from "../../services/services";

@Component({
    moduleId: module.id,
    selector: "my-layer-list",
    templateUrl: 'LayerList.component.html',
    styleUrls: ["LayerList.component.css"]
})

export class LayerListComponent {
    layers: Layer[] = [];

    constructor(private _eventService:EventsService) {
        this._eventService.subscribe("setLayers",this,(layersList:Layer[])=>{
           this.layers = layersList;
        });
    }

    private _setOrder(){
        this.layers.forEach((layer:Layer,idx:number)=>{
           layer.zIndex = idx+1;
        });
    }
}