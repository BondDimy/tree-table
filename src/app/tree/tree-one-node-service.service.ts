import { Injectable } from '@angular/core';
import {LocalStorageService} from '../local-storage/local-storage.service';

@Injectable()
export class TreeOneNodeServiceService extends LocalStorageService {

  protected treeName = 'treeTwo';

}
