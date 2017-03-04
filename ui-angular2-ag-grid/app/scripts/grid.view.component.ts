/// <reference path="../lib/ag-grid/ag-grid.d.ts"/>
/// <reference path="../../node_modules/typescript-deferred/typescript_deferred.d.ts"/>
import {Component, View} from 'angular2/core';
import {Http, Headers, Response, RequestOptionsArgs, HTTP_PROVIDERS} from 'angular2/http';
import { Observable, Subscription } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import * as tsd from '../../node_modules/typescript-deferred/typescript_deferred';

@Component({
    selector: 'simple-ng2-grid',
    viewProviders: [HTTP_PROVIDERS]
})
@View({
    directives: [ag.grid.AgGridNg2],
    template: `
        <div class="return-message alert alert-info">{{message}}</div>
        <div class="toolbar">
            <button type="button" id="loadData" class="btn btn-success" (click)="loadData($event)">Load Data</button>
            <button type="button" id="saveData" class="btn btn-success" (click)="saveData($event)">Save Data</button>
        </div>
        <ag-grid-ng2
            class="ag-fresh"
            style="height: 100%;"
            [columnDefs]="columnDefs"
            [rowData]="rowData"
        ></ag-grid-ng2>
        `
})
export class GridViewComponent {
    // put columnDefs directly onto the controller
    public columnDefs = [
        {headerName: "Code", field: "code", editable: true},
        {headerName: "Name", field: "name", editable: true},
        {headerName: "Version", field: "version"}
    ];
    // data bound to grid
    public rowData = [];

    public message;

    constructor(public http: Http) {
    };

    public doLoadData = function() {
        let response: Observable<Response> =
            this.http.get('/hrdemo/jobs?size=100000');

        let deferred = tsd.create();

        response.map(
            response => response.json()._embedded.jobs
        ).subscribe(
            (data) => {
                this.rowData = data;
                deferred.resolve();
                return data;
            },
            (err) => {
                this.message = err;
                deferred.reject(err);
            }
        );
        return deferred.promise;
    };

    public loadData($event) {
        this.doLoadData().then( () => {
            this.message = 'Successfully loaded the data.';
        });

    };

    public saveData($event) {
        let data: string = JSON.stringify(this.rowData);
        let options: RequestOptionsArgs = {
            headers: new Headers({ "Content-Type": "application/json" })
        };
        let response: Observable<Response> =
            this.http.put('/hrdemo/jobs/list', data, options);
        response.subscribe( () => {
            this.doLoadData().then( () => {
                this.message = 'Successfully saved and reloaded the data.';
            });

        });

    };

}
