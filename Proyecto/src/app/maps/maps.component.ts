import {Component} from "@angular/core";

@Component({
  selector: 'app-maps',
  templateUrl: './maps.component.html',
  styleUrls: ['./maps.component.css']
})

export class MapsComponent{
  center = {lat: 20.995088537296137, lng: -101.86088123629958};
  zoom = 15;
  display: google.maps.LatLngLiteral;
}
