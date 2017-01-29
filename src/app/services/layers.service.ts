import {Injectable} from '@angular/core';
import {Http, Response} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import {Layer} from '../classes/classes';

@Injectable()
export class LayersService {
    private layers_json = "/TEST_DATA/layers.json";

    constructor(private http: Http) {

    }

    public getLayers():Promise<any>{
        return this.http.get(this.layers_json)
            .map(this.getData)
            .catch(this.handleError).toPromise();
    }

    private getData(res: Response) {
        if (res.status < 200 || res.status >= 300) {
            throw new Error("Bad response status: " + res.status);
        }

        let body = res.json();
        return body || {};
    }

    private handleError(ex: any) {
        let msg = "Reguest error:" + ex;
        console.error(msg);
        return Observable.throw(msg);
    }

}
