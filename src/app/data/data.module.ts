import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListComponent } from './list/list.component';
import { FormsModule } from '@angular/forms';
import { DataRoutingModule } from './data-routing.module';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    DataRoutingModule,
  ],
  declarations: [
    ListComponent,
  ]
})
export class DataModule { }
