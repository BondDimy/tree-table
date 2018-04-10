import {Injectable} from '@angular/core';
import {LocalStorageService} from '../local-storage/local-storage.service';
import {Observable} from 'rxjs/Observable';
import {Subject} from 'rxjs/Subject';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

@Injectable()
export class TreeOneNodeServiceService extends LocalStorageService {

  protected treeName = 'treeTwo';
  coords = new BehaviorSubject({x: -1000, y: -1000});

  setCoords(x: number, y: number) {
    this.coords.next({x, y});
  }

}
