import {ILayer} from "../interfaces/interfaces";
import {Map, TileLayer} from "leaflet";
import {Utils} from "./Utils";

declare let L: any; // to fix compile error of leaflet.d.ts

export class Layer implements ILayer {
    public map: Map;
    public type: string = "tms";
    public title: string = "";
    public url: string = "";
    public layerName: string = "";
    public layerInstance: TileLayer;
    private _opacity: number = 0;
    private _visible: boolean = true;
    private _zIndex: number = 0;

    constructor(data: any) {
        if (data) {
            Utils.mixin(this, data);
        }
        this._createInstance();

        //--
        this.opacity = this.opacity;
        this.visible = this.visible;
        this.zIndex = this.zIndex;
    }

    private _createInstance() {
        if (this.type === "wms") {
            this.layerInstance = new L.TileLayer.WMS(this.url, {
                layers: this.layerName,
                format: 'image/png',
                transparent: true
            });
        } else if (this.type === "tms") {
            this.layerInstance = new L.TileLayer(this.url, {
                tms: true
            });
        }
    }

    public set opacity(opacity: number) {
        if (!this.layerInstance) return;
        this._opacity = opacity;
        this.layerInstance.setOpacity((100 - opacity) / 100);
    }

    public get opacity(): number {
        return this._opacity;
    }

    public set visible(visible: boolean) {
        if (!this.layerInstance) return;
        this._visible = visible;
        if (visible) {
            this.map.addLayer(this.layerInstance);
        } else {
            this.map.removeLayer(this.layerInstance);
        }
    }

    public get visible(): boolean {
        return this._visible;
    }


    public set zIndex(value: number) {
        if (!this.layerInstance) return;
        this._zIndex = value;
        this.layerInstance.setZIndex(value);
    }

    public get zIndex(): number {
        return this._zIndex;
    }
}