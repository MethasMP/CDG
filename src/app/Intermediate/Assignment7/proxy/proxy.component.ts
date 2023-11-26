import { Component, ElementRef, OnInit, ViewChild, AfterViewInit } from '@angular/core';
import * as urlUtils from '@arcgis/core/core/urlUtils';
import MapImageLayer from '@arcgis/core/layers/MapImageLayer';
import FeatureLayer from '@arcgis/core/layers/FeatureLayer';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';

@Component({
  selector: 'app-proxy',
  templateUrl: './proxy.component.html',
  styleUrls: ['./proxy.component.css'],
})
export class ProxyComponent implements OnInit, AfterViewInit{
  ngAfterViewInit(): void {
    throw new Error('Method not implemented.');
  }
  @ViewChild('mapPanel', { static: true }) mapPanel!: ElementRef;
  map: Map | null = null;
  mapView: MapView | null = null;

  ngOnInit(): void {

    this.map = new Map({
      basemap: 'topo-vector', // Choose an initial basemap
    });

    this.mapView = new MapView({
      container: this.mapPanel.nativeElement,
      map: this.map,
      center: [100.54334160799657, 13.703079549746256],
      zoom: 15,
    });

    const shop = new FeatureLayer({
      url: 'https://services7.arcgis.com/aobf6rfDFoFPOMrx/arcgis/rest/services/Shop/FeatureServer',
    });

    const building = new FeatureLayer({
      url: 'https://services7.arcgis.com/aobf6rfDFoFPOMrx/arcgis/rest/services/BuildingBlock/FeatureServer',
    });

    this.map!.addMany([shop,building]);

    urlUtils.addProxyRule({
      urlPrefix:'https://services7.arcgis.com',
      proxyUrl: 'https://localhost:5001/api/appproxy',
    });
  }
}
