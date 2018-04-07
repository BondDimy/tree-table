import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {
  IConfiguration,
  IContextMenu,
  ITreeData,
  ITreeState,
  NodeDispatcherService,
  TreeActionsService,
  TreeModel,
  treeStateSelector
} from '@rign/angular2-tree';
import {Observable} from 'rxjs/Observable';
import {TreeOneNodeServiceService} from './tree-one-node-service.service';
import {Store} from '@ngrx/store';
import {filter, map} from 'rxjs/operators';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreeComponent implements OnInit {

  public folders: Observable<ITreeData>;

  public contextMenu: IContextMenu[] = [];

  public treeConfiguration: IConfiguration = {
    showAddButton: true,
    disableMoveNodes: false,
    treeId: 'tree2',
    dragZone: 'tree2',
    dropZone: ['tree2'],
    disableContextMenu: false
  };

  public treeModel: TreeModel;

  public constructor(private store: Store<ITreeState>,
                     private treeActions: TreeActionsService,
                     private nodeDispatcherService: NodeDispatcherService,
                     private treeTwoNodeService: TreeOneNodeServiceService) {
  }

  public ngOnInit() {
    const treeId = this.treeConfiguration.treeId;
    this.nodeDispatcherService.register(treeId, this.treeTwoNodeService);

    this.store.dispatch(this.treeActions.registerTree(treeId));


    this.folders = this.store.select(treeStateSelector)
      .pipe(
        map((data: ITreeState) => {
          return data[treeId];
        }),
        filter((data: ITreeData) => !!data)
      );
    this.treeModel = new TreeModel(this.folders, this.treeConfiguration);
  }

}
