import {Component} from 'angular2/core';
import {GridViewComponent} from './grid.view.component';

@Component({
    selector: 'my-app',
    directives: [GridViewComponent],
    template: '<h1>hrdemo Angular 2 App</h1><br><simple-ng2-grid></simple-ng2-grid>'
})
export class AppComponent { }
