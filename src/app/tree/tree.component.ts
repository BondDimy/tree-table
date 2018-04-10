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
import {contextMenu} from './contextMenu';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TreeComponent implements OnInit {

  public folders: Observable<ITreeData>;
  public initialized = false;

  public contextMenuX;
  public contextMenuy;

  public node = null;

  public treeConfiguration: IConfiguration = {
    showAddButton: true,
    disableMoveNodes: false,
    treeId: 'tree2',
    dragZone: 'tree2',
    dropZone: ['tree2'],
    disableContextMenu: false
  };

  public treeModel: TreeModel;
  // public contextMenu: IContextMenu = {
  //
  // };


  public constructor(private store: Store<ITreeState>,
                     private treeActions: TreeActionsService,
                     private nodeDispatcherService: NodeDispatcherService,
                     private treeTwoNodeService: TreeOneNodeServiceService,
                     private treeActionsService: TreeActionsService) {
    contextMenu.state.asObservable().subscribe(data => {
      this.node = data.node;
    });
  }

  coords = contextMenu.state.asObservable();

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
    this.initialized = true;
  }

  resetCoords() {
    this.treeTwoNodeService.setCoords(-1000000, -100000);
  }

  changeCoords($event: { x: number, y: number, node: any }) {
    this.node = $event.node;
    this.treeTwoNodeService.setCoords($event.x, $event.y);
  }

  public onDelete($event: MouseEvent): void {
    this.store.dispatch(this.treeActionsService.deleteNode(this.treeModel.treeId, this.node));
  }

  public onEdit($event: MouseEvent): void {
    this.store.dispatch(this.treeActionsService.editNodeStart(this.node));
  }
}
