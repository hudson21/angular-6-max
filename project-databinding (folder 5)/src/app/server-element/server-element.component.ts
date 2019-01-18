import { Component, OnInit, Input, ViewEncapsulation } from '@angular/core';

@Component({
  selector: 'app-server-element',
  templateUrl: './server-element.component.html',
  styleUrls: ['./server-element.component.css']
})
export class ServerElementComponent implements OnInit {
  //srvElement is an alias which can be assigned to the variable that is being binded
  @Input('srvElement') element: { type:string, name:string, content:string};

  constructor() { }

  ngOnInit() {
  }

}
 