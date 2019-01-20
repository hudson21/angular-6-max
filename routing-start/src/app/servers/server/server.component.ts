import { Component, OnInit } from '@angular/core';

import { ServersService } from '../servers.service';
import { ActivatedRoute, Params, Router, Data } from '@angular/router';

@Component({
  selector: 'app-server',
  templateUrl: './server.component.html',
  styleUrls: ['./server.component.css']
})
export class ServerComponent implements OnInit {
  server: {id: number, name: string, status: string};

  constructor(private serversService: ServersService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit() {
    this.route.data
        .subscribe(
          (data: Data) => {
            this.server = data['server'];
          }
        );
    /*
      const id = +this.route.snapshot.params['id'];// (+) convert to number
      this.server = this.serversService.getServer(id);
      this.route.params
          .subscribe(
            (params: Params) => {
              this.server = this.serversService.getServer(+params['id']);
            }
          );
    */
      
  }

  onEdit() {
    //merge: to merge the old queryParams with the new ones 
    //preverve: override the old ones and to keep the new ones
    this.router.navigate(['edit'], {relativeTo: this.route, queryParamsHandling: 'preserve'});
  }
 
}
