import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InputNumberModule } from 'primeng/inputnumber';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { MapComponent } from './Begin/Assignment3/map/map.component';
import { LocatorComponent } from './Begin/Assignment3/locator/locator.component';
import { MapComponent4 } from './Begin/Assignment4/map/map4.component';
import { QueryTaskComponent } from './Intermediate/Assignment1/QueryTask.component';
import { ClosestFacilityComponent } from './Intermediate/Assignment2/closest-facility/closest-facility.component';
import { RouteComponent } from './Intermediate/Assignment4/route/route.component';
import { LayerListComponent } from './Intermediate/Assignment5/layer-list/layer-list.component';
import { SwipeComponent } from './Intermediate/Assignment6/swipe/swipe.component';
import { ProxyComponent } from './Intermediate/Assignment7/proxy/proxy.component';
import { UMComponent } from './Intermediate/Assignment8/um/um.component';
import { InputTextModule } from 'primeng/inputtext';
import { TableModule } from 'primeng/table';
import { PostTest1 } from './Intermediate/PostTest1/PostTest1.component';



@NgModule({
  declarations: [
    AppComponent,
    MapComponent,
    LocatorComponent,
    MapComponent4,
    QueryTaskComponent,
    ClosestFacilityComponent,
    RouteComponent,
    LayerListComponent,
    SwipeComponent,
    ProxyComponent,
    UMComponent,
    PostTest1
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    InputNumberModule,
    InputTextModule,
    FormsModule,
    ButtonModule,
    TableModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
