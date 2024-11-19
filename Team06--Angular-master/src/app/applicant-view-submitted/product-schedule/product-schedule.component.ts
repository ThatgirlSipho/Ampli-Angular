import { Component } from '@angular/core';

@Component({
  selector: 'app-product-schedule',
  templateUrl: './product-schedule.component.html',
  styleUrls: ['./product-schedule.component.css']
})
export class ProductScheduleComponent {

  handleAccept() {
    alert('You have accepted');
  }

  handleReject() {
    alert('You have rejected');
  }
  

}
