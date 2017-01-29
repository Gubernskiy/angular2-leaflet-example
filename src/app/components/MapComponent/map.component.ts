import {Component} from "@angular/core";
import {IMap, ILayer} from "../../interfaces/interfaces";
import {LayersService, EventsService} from "../../services/services";
import {Layer} from "../../classes/classes";

import {Map, LatLng, LatLngBounds, MouseEvent, TileLayer} from "leaflet";
declare let L: any; // to fix compile error of leaflet.d.ts


@Component({
    selector: "my-map",
    template: '<div id="map"></div>',
    providers:[LayersService]
})

export class MapComponent implements IMap {
    private _map: Map;
    private _extent: string;
    private _center: number[] = [39,-100];
    private _zoom: number = 4;

    public allLayers:Layer[]=[];
    constructor(private _layerService:LayersService, private _eventService:EventsService){
    }

    ngOnInit() {
        this.createMap();
        this._getLayers();
    }

    public createMap() {
        let map = new L.Map("map", {
            zoomControl: false,
            center: new L.LatLng(this.center[0], this.center[1]),
            zoom: this.zoom,
            minZoom:4,
            attributionControl: true,
            doubleClickZoom: false,
            worldCopyJump: true,
            inertia: false,
            fadeAnimation: false,
            zoomAnimation: false,
            boxZoom: false
        });

        this._map = map;

        this._setEvents();

        //--- add osm layer as base Layer
        let osmUrl:string = 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png';
        let osmAttrib:string = 'Map data © <a href="http://openstreetmap.org">OpenStreetMap</a> contributors';
        let osm:TileLayer = new L.TileLayer(osmUrl, {attribution: osmAttrib});
        this._map.addLayer(osm);
    }

    public addLayer(layer: ILayer) {

    }

    public removeLayer(layer: ILayer) {

    }

    /**
     * map extent
     * @param extent
     */
    public set extent(extent: string) {
        this._extent = extent;
        let coords: string[] = extent.split(",");
        let southWest: LatLng = new L.LatLng(Number(coords[0]), Number(coords[1])),
            northEast: LatLng = new L.LatLng(Number(coords[2]), Number(coords[3])),
            bounds: LatLngBounds = new L.LatLngBounds(southWest, northEast);
        this._map.fitBounds(bounds, {animate: false});
    }

    public get extent(): string {
        return this._extent;
    }

    /**
     * map zoom
     * @param zoom
     */
    public set zoom(zoom: number) {
        this._zoom = zoom;
        this._map.setZoom(zoom);
    }

    public get zoom(): number {
        return this._zoom;
    }

    /**
     * map center
     * @param center
     */
    public set center(center: number[]) {
        if (center.length < 2) return;

        this._center = center;
        let point: LatLng = new L.LatLng(center[0], center[1]);
        this._map.setView(point, this._map.getZoom());
    }

    public get center(): number[] {
        return this._center;
    }

    private _setEvents() {
        // here connect to map events (click, zoomEnd, etc.)
        // for example
        this._map.on("click", (e: MouseEvent) => {
            console.log(e.latlng);
        });
    }


    private _getLayers(){
        this._layerService.getLayers().then((layers:ILayer[])=>{
           layers.forEach((layerOpt:ILayer,idx:number)=>{
               layerOpt.map = this._map;
               let layer:Layer = new Layer(layerOpt);
               layer.zIndex = idx + 1;
               this._map.addLayer(layer.layerInstance);
               this.allLayers.push(layer);
           });

           //-- publish event for another component
            this._eventService.publish("setLayers",this.allLayers);

        });
    }

}