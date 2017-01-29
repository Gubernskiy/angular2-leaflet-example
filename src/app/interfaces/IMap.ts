import {ILayer} from "./ILayer";
export interface IMap{
    zoom:number;
    center:number[];
    extent:string;

    createMap():void;
    addLayer(layer:ILayer):void;
    removeLayer(layer:ILayer):void;
}