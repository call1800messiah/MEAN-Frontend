import { Component, OnInit } from '@angular/core';
import {Observable} from "rxjs/index";
import {DataService} from "../../core/services/data.service";

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  dataObservable: Observable<any>;
  newData: string;

  constructor(private dataService: DataService) { }

  ngOnInit() {
    this.dataObservable = this.dataService.retrieveAll();
  }

  onClickAdd(data: string) {
    this.dataService.create(data);
  }

  onClickDelete(data: any) {
    this.dataService.delete(data);
  }

  onClickUpdate(data: any) {
    this.dataService.update(data);
  }
}
