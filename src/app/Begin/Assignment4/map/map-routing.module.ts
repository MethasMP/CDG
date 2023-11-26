import { NgModule } from '@angular/core'
import { Routes, RouterModule } from '@angular/router'

import { MapComponent4 } from './map4.component'

const routes: Routes = [
  {
    path: '',
    component: MapComponent4,
  },
]

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class MapRoutingModule {}
