import { Component, Input, OnInit } from '@angular/core';
import { AssistService } from '../services/assist.service';


@Component({
  selector: 'app-assist',
  templateUrl: './assist.component.html',
  styleUrls: ['./assist.component.css']
})
export class AssistComponent implements OnInit {
  @Input() page: string = '';
  assistContent: any;

  constructor(private assistService: AssistService) {}

  ngOnInit(): void {
  //   this.assistService.getAssistContent(this.page).subscribe(content => {
  //     this.assistContent = content;
  //   });
  // }
}
}