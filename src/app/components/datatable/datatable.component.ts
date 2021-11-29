import { Component, OnDestroy, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Subject } from 'rxjs';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-datatable',
  templateUrl: './datatable.component.html',
  styles: [
  ]
})
export class DatatableComponent implements OnInit, OnDestroy {

  dtOptions: DataTables.Settings = {};
  personas: any = [];

  dtTrigger =new Subject();

  constructor( private httpClient: HttpClient ) { }

  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      language: {
        url: '//cdn.datatables.net/plug-ins/1.11.3/i18n/es-cl.json'
      }
    };
    this.httpClient.get('https://dummy.restapiexample.com/api/v1/employees').pipe(
      map( (resp: any) => {
        return resp.data;
      })
    ).subscribe( resp => {
      this.personas = resp;
      console.log(this.personas);
      this.dtTrigger.next();
    });
  }

  ngOnDestroy(): void {
    this.dtTrigger.unsubscribe();
  }

}
