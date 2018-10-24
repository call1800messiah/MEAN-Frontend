import { Injectable } from '@angular/core';
import { Subject } from 'rxjs/index';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private socket;
  private data;
  private dataSubject: Subject<any[]>;

  constructor(private auth: AuthService) {
    this.socket = this.auth.getSocket();
  }

  create(data): void {
    this.socket.emit('create', data);
  }

  delete(data) {
    this.socket.emit('delete', data);
  }

  update(data) {
    this.socket.emit('update', data);
  }

  retrieve(data) {
    this.socket.emit('retrieve', data);
  }

  retrieveAll() {
    this.setupDataSubject();
    this.socket.emit('retrieve', null);
    return this.dataSubject.asObservable();
  }

  private setupDataSubject() {
    if (this.dataSubject === undefined) {
      this.dataSubject = new Subject();
    }
    this.socket.on('retrieveAllData', (data) => {
      this.data = data;
      this.dataSubject.next(this.data);
    });
    this.socket.on('dataCreated', (data) => {
      this.data.push(data);
      this.dataSubject.next(this.data);
    });
    this.socket.on('dataDeleted', (id) => {
      const target = this.data.filter((obj) => obj._id === id)[0];
      if (target) {
        this.data.splice(this.data.indexOf(target), 1);
        this.dataSubject.next(this.data);
      }
    });
    this.socket.on('dataUpdated', (data) => {
      const target = this.data.filter((obj) => obj._id === data._id)[0];
      if (target) {
        this.data.splice(this.data.indexOf(target), 1, data);
        this.dataSubject.next(this.data);
      }
    });
  }
}
