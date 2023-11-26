import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MapComponent } from './Begin/Assignment3/map/map.component';
import { MapComponent4 } from './Begin/Assignment4/map/map4.component';
import { QueryTaskComponent } from './Intermediate/Assignment1/QueryTask.component';
import { ClosestFacilityComponent } from './Intermediate/Assignment2/closest-facility/closest-facility.component';
import { RouteComponent } from './Intermediate/Assignment4/route/route.component';
import { LayerListComponent } from './Intermediate/Assignment5/layer-list/layer-list.component';
import { SwipeComponent } from './Intermediate/Assignment6/swipe/swipe.component';
import { ProxyComponent } from './Intermediate/Assignment7/proxy/proxy.component';
import { UMComponent } from './Intermediate/Assignment8/um/um.component';
import { PostTest1 } from './Intermediate/PostTest1/PostTest1.component';


const routes: Routes = [
{ path: '' , component: MapComponent  }, 
{ path: 'map' , component: MapComponent4 }, 
{ path: 'querytask', component: QueryTaskComponent },
{ path: 'closest', component: ClosestFacilityComponent },
{ path: 'route', component: RouteComponent },
{ path: 'layer', component: LayerListComponent },
{ path: 'swip', component: SwipeComponent },
{ path: 'proxy', component: ProxyComponent },
{ path: 'um', component: UMComponent },
{ path: 'one', component: PostTest1 },

];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
