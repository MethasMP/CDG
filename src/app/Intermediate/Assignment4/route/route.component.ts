import { Component, OnInit, AfterViewInit, ViewChild, ElementRef } from '@angular/core';
import * as route from "@arcgis/core/rest/route";
import RouteParameters from "@arcgis/core/rest/support/RouteParameters";
import GraphicsLayer from "@arcgis/core/layers/GraphicsLayer";
import FeatureSet from "@arcgis/core/rest/support/FeatureSet";
import MapView from "@arcgis/core/views/MapView";
import Map from "@arcgis/core/Map";
import SimpleMarkerSymbol from '@arcgis/core/symbols/SimpleMarkerSymbol';
import SimpleLineSymbol from '@arcgis/core/symbols/SimpleLineSymbol';
import Graphic from '@arcgis/core/Graphic';
import Color from '@arcgis/core/Color';
import PictureMarkerSymbol from "@arcgis/core/symbols/PictureMarkerSymbol.js";

@Component({
  selector: 'app-route',
  templateUrl: './route.component.html',
  styleUrls: ['./route.component.css']
})
export class RouteComponent implements OnInit, AfterViewInit {

  @ViewChild('mapPanel', { static: true }) mapPanel!: ElementRef;

  map: Map | null = null;
  mapView: MapView | null = null;
  directionsList: any[] = [];
  keep: any[] = [];

  ngAfterViewInit(): void {

  }

  ngOnInit() {
    const routeUrl = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/NetworkAnalysis/SanDiego/NAServer/Route";

    // The stops and route result will be stored in this layer
    const routeLayer = new GraphicsLayer();

    // Setup the route parameters
    // const routeParams = new RouteParameters({
    //   // An authorization string used to access the routing service
    //   apiKey: "%YOUR_API_KEY%",
    //   stops: new FeatureSet(),
    //   outSpatialReference: {
    //     // autocasts as new SpatialReference()
    //     wkid: 3857
    //   }
    // });

    this.map = new Map({
      basemap: "streets-navigation-vector",
      layers: [routeLayer] // Add the route layer to the map
    });

    this.mapView = new MapView({
      container: this.mapPanel.nativeElement,
      map: this.map, // Reference to the map object created before the scene
      center: [-117.161087, 32.715736],
      zoom: 17
    });

    this.mapView.on("click", (event) => {
      if (this.mapView) {
        if (this.mapView.graphics.length === 0) {
          this.addGraphic("origin", event.mapPoint);
        } else if (this.mapView.graphics.length > 0) {
          this.addGraphic("destination", event.mapPoint);
        }
      }
    });
  }


  addGraphic(type: string, point: any): void {
    if (this.mapView) {
      const graphic = new Graphic({
        symbol: new SimpleMarkerSymbol({
          color: (type === "origin") ? "white" : "black",
          style: "cross"
          ,
          size: 15,
          outline: {
            width: 4,
          }
        }),
        geometry: point
      });

      this.mapView.graphics.add(graphic);

    }
  }

  clearDirectionsAndRoute(): void {
    if (this.mapView) {
      this.mapView.graphics.removeAll();
      this.directionsList = [];
    }
  }

  getRoute(): void {
    if (this.mapView) {
      const routeUrl = "https://sampleserver6.arcgisonline.com/arcgis/rest/services/NetworkAnalysis/SanDiego/NAServer/Route";
      const routeParams = new RouteParameters({
        stops: new FeatureSet({
          features: this.mapView.graphics.toArray()
        }),
        returnDirections: true
      });

      route.solve(routeUrl, routeParams)
        .then((data) => {
          data.routeResults.forEach((result) => {
            result.route.symbol = new SimpleLineSymbol({
              color: 'cyan',
              width: 3
            });
            this.mapView!.graphics.add(result.route);
          });
          this.directionsList = [];
          const features = data.routeResults[0].directions.features;
          features.forEach((result) => {
            const directionItem = {

              text: result.attributes.text,
              length: result.attributes.length,
              geometry: result.geometry
            };
            this.directionsList.push(directionItem);

          });


        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }

  zoomToRoute(geometry: any,) {
    // ทำการ Zoom ไปที่ข้อมูลทางลงใน <ol>
    this.mapView!.goTo(geometry.extent);

  }
  toggleHighlight(direction: any): void {
    // Toggle the 'clicked' property of the clicked direction
    this.directionsList.forEach(dir => dir.clicked = false);

    // Add highlight to the clicked direction
    direction.clicked = true;


  }



}