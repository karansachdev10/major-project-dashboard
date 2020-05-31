import { Component, OnInit } from '@angular/core';
import { routerTransition } from '../../router.animations';
import { ActivatedRoute, Router } from '@angular/router';
import { RestService } from './../../services/rest.service';

@Component({
    selector: 'app-tables',
    templateUrl: './tables.component.html',
    styleUrls: ['./tables.component.scss'],
    animations: [routerTransition()]
})
export class TablesComponent implements OnInit {
    lcuId;
    public lcuData = {lcu : { name : "" , switches : [] }, data : { totalPower : 0, activeSwitchCount : 0, sum : 0, highestTemperature : 0  } };
    constructor( private route: ActivatedRoute,
        private router: Router, private restService: RestService) {
            this.route.params.subscribe((params) => this.lcuId = params['id']);
        }

    ngOnInit() {
        const url = `/lcu/${this.lcuId}`;
        this.restService.get(url)
        .subscribe((data: any) => this.lcuData = data);
    }

    public openSwitch(id) {
        this.router.navigate(['/switch', { id: id }]);
    }
}
