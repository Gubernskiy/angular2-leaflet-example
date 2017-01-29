import {Map,TileLayer} from "leaflet";

export interface ILayer{
    map:Map;
    type:string;
    title:string;
    url:string;
    opacity:number;
    visible:boolean;
    zIndex:number;
    layerInstance:TileLayer;

    layerName?:string; //-- need for WMS layers
}