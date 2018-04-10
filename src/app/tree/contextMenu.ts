import {Observable} from 'rxjs/Observable';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

export const contextMenu = {
  state: new BehaviorSubject({x: -1000, y: -1000, node: null})
};
