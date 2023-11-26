import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import TileLayer from '@arcgis/core/layers/TileLayer';
import MapView from '@arcgis/core/views/MapView';
import LayerList from '@arcgis/core/widgets/LayerList';
import Swipe from '@arcgis/core/widgets/Swipe';
import Expand from '@arcgis/core/widgets/Expand';

@Component({
  selector: 'app-swipe',
  templateUrl: './swipe.component.html',
  styleUrls: ['./swipe.component.css'],
})
export class SwipeComponent implements AfterViewInit {
  @ViewChild('mapPanel', { static: true }) mapPanel!: ElementRef;
  map: Map | null = null;
  mapView: MapView | null = null;

  ngAfterViewInit() {

    this.map = new Map({
      basemap: 'topo-vector', // Choose an initial basemap
    });

    // this.mapView = new MapView({
    //   container: this.mapPanel.nativeElement,
    //   map: this.map,
    //   center: [-117.161087, 32.715736],
    //   zoom: 2
    // });

    this.mapView = new MapView({
      container: this.mapPanel.nativeElement,
      map: this.map,
      zoom: 14,
      center: [-117.161087, 32.715736], 
      constraints: {
        maxZoom: 17,
        minZoom: 8
      }
    });

    const oceanBasemap = new TileLayer({
      url: "https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer",
      maxScale: 3000
    });
    this.map.layers.add(oceanBasemap);

    const WorldStreet = new TileLayer({
      url: "https://services.arcgisonline.com/arcgis/rest/services/World_Street_Map/MapServer",
      maxScale: 3000
    });
    this.map.layers.add(WorldStreet);

    const layerList = new LayerList({
      view: this.mapView as MapView,
    });
    // const llExpand = new Expand({
    //   view: this.mapView as MapView,
    //   content: layerList,
    //   expanded: false
    // });
    // this.mapView!.ui.add(llExpand, "top-right");

    // create a new Swipe widget
    const swipe = new Swipe({
      leadingLayers: [oceanBasemap],
      trailingLayers: [WorldStreet],
      position: 35, // set position of widget to 35%
      view: this.mapView as MapView
    });

    // add the widget to the view
    this.mapView!.ui.add(swipe);

  }
}
