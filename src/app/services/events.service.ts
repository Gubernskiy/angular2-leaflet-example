import {Injectable, EventEmitter} from "@angular/core";

@Injectable()
export class EventsService {
    private _events:EventEmitter<any>[]=[];
    constructor() {}

    public subscribe(eventName: string, context: Object, callback: Function) {

        if ( !this._events.hasOwnProperty(eventName) ) {
            this._events[eventName] = new EventEmitter();
        }
        return this._events[eventName].subscribe((item:any) => callback.call(context, item));
    }

    public publish(eventName: string, data: any) {

        if ( !this._events.hasOwnProperty(eventName)) {
            this._events[eventName] = new EventEmitter();
        }
        this._events[eventName].emit(data);
    }

}
