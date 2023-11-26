import { Component, ElementRef, ViewChild, AfterViewInit, EventEmitter, Output } from '@angular/core';
import Map from '@arcgis/core/Map';
import MapView from '@arcgis/core/views/MapView';
import Point from '@arcgis/core/geometry/Point';
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import Graphic from '@arcgis/core/Graphic';
import { CustomPoint } from '../../Assignment3/locator/CustomPoint';
import MapImageLayer from "@arcgis/core/layers/MapImageLayer";
import IdentifyParameters from "@arcgis/core/rest/support/IdentifyParameters";
import * as identify from "@arcgis/core/rest/identify.js";
import Color from '@arcgis/core/Color';
import SimpleFillSymbol from '@arcgis/core/symbols/SimpleFillSymbol'


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.css'],
})
export class MapComponent4 implements AfterViewInit {
  @Output() longla: EventEmitter<CustomPoint> = new EventEmitter<CustomPoint>();
  @ViewChild('mapPanel', { static: true }) mapPanel!: ElementRef;
  
  map: Map | null = null;
  mapView: MapView | null = null;
  point: Point | null = null;
  marker: SimpleMarkerSymbol | null = null;
  pointGraphic: Graphic | null = null;
  customPoint: CustomPoint = new CustomPoint();
  ngAfterViewInit() {
    const layer = new MapImageLayer({
      url: 'https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer',

    });

    this.map?.add(layer);

    this.map = new Map({
      basemap: 'topo-vector',
    });

    const identifyURL = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer";
    //
    const identifyLayer = new MapImageLayer({
      url: identifyURL,
      opacity: 0.5
    });

    const map = new Map({
      basemap: "osm"
    });
    map.add(identifyLayer);

    this.mapView = new MapView({
      container: this.mapPanel.nativeElement,
      map: this.map,
      center: [-98.5795, 39.8283], // [longitude, latitude]
      zoom: 15,
    });

    this.mapView.on('click', (event) => {

      this.customPoint = { longitude: event.mapPoint.longitude, latitude: event.mapPoint.latitude}
  
      if (this.mapView) {
        const params = new IdentifyParameters()
        params.tolerance = 1
        params.layerIds = [3]
        params.geometry = event.mapPoint;
        params.mapExtent = this.mapView.extent;
        params.returnGeometry = true;
        
        

        identify
          .identify('https://sampleserver6.arcgisonline.com/arcgis/rest/services/Census/MapServer', params)
          .then((response: any) => {
            console.log(response)
            let feature = response.results[0].feature

        
            this.mapView?.openPopup({
              features: [feature],
              location: event.mapPoint,
            })

            if (this.mapView) {
              const polygonSymbol = new SimpleFillSymbol({
                color: new Color([255, 165, 0, 0.5]),
                outline: {
                  color: [255, 165, 0, 1],
                  width: 2,
                }
              });

              const pointGraphic = new Graphic({
                geometry: feature.geometry,
                symbol: polygonSymbol,
              });

              this.mapView.graphics.removeAll()
              this.mapView.graphics.add(pointGraphic);
            }

          })
      }

    });//

    // this.point = new Point({
    //   longitude: 100.5441,
    //   latitude: 13.7034348,
    // });

    // this.marker = new SimpleMarkerSymbol({
    //   color: [226, 119, 40],
    //   outline: {
    //     color: [255, 255, 255],
    //     width: 2,
    //   },
    // });

    // this.pointGraphic = new Graphic({
    //   geometry: this.point,
    //   symbol: this.marker,
    // });
    // this.mapView.graphics.add(this.pointGraphic);
    // this.map.add(layer);


  }



  handleLocate(event: CustomPoint) {
    if (event.longitude && this.mapView && event.latitude) {

      this.mapView?.graphics.removeAll()
      const newCenter = new Point({
        longitude: event.longitude,
        latitude: event.latitude,
      });
      this.marker = new SimpleMarkerSymbol({
        color: [226, 119, 40],
        outline: {
          color: [255, 255, 255],
          width: 2,
        },
      });
      this.pointGraphic = new Graphic({
        geometry: newCenter,
        symbol: this.marker,
      });
      this.mapView?.graphics.add(this.pointGraphic);
      this.mapView?.goTo(newCenter);
    }
  }

}
