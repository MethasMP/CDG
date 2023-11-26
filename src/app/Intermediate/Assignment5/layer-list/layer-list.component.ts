import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import LayerList from '@arcgis/core/widgets/LayerList';
import TileLayer from '@arcgis/core/layers/TileLayer';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';

@Component({
  selector: 'app-layer-list',
  templateUrl: './layer-list.component.html',
  styleUrls: ['./layer-list.component.css']
})
export class LayerListComponent implements AfterViewInit {
  @ViewChild('mapPanel', { static: true }) mapPanel!: ElementRef;
    map: Map | null = null;
  mapView: MapView | null = null;
  layerList: LayerList | null = null;

  ngAfterViewInit(): void {
    // Create a new Map
    this.map = new Map({
      basemap: 'topo-vector', // Choose an initial basemap
    });

    // Create a new MapView
    this.mapView = new MapView({
      container: this.mapPanel.nativeElement,
      map: this.map,
      center: [-117.161087, 32.715736],
      zoom: 2
    });

    // Wait for the view to be loaded before creating the LayerList
    this.mapView.when(() => {
      // Create a new LayerList widget
      this.layerList = new LayerList({
        view: this.mapView as MapView,
      });

      // Add the LayerList widget to the UI
      this.mapView!.ui.add(this.layerList, 'top-right');
    });

    // Create and add layers to the map
    const oceanBasemap = new MapImageLayer({
      url: 'https://services.arcgisonline.com/arcgis/rest/services/Ocean/World_Ocean_Base/MapServer',
    });

    const censusLayer = new MapImageLayer({
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',
    });

    this.map.layers.add(oceanBasemap);
    this.map.layers.add(censusLayer);

    //https://gisserv1.cdg.co.th/arcgis/rest/services/AtlasX/AtlasX_Secure/MapServer
  }
}


