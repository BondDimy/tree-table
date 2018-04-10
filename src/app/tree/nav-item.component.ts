import {Component, ElementRef, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {IContextMenu, ItemComponent, ITreeState, TreeActionsService, TreeModel} from '@rign/angular2-tree';
import {animate, style, transition, trigger} from '@angular/animations';
import {Observable} from 'rxjs/Observable';
import {IOuterNode} from '@rign/angular2-tree/src/interfaces/IOuterNode';
import {FormControl} from '@angular/forms';
import {TreeOneNodeServiceService} from './tree-one-node-service.service';
import {contextMenu} from './contextMenu';

// import {INode} from '../local-storage/local-storage.service';

@Component({
  selector: 'app-nav-item',
  templateUrl: './nav-item.component.html',
  styleUrls: ['./nav-item.component.scss'],
  animations: [
    trigger(
      'enterAnimation', [
        transition(':enter', [
          style({transform: 'translateY(100%)', opacity: 0}),
          animate('500ms', style({transform: 'translateX(0)', opacity: 1}))
        ]),
        transition(':leave', [
          style({transform: 'translateY(0)', opacity: 1}),
          animate('500ms', style({transform: 'translateX(100%)', opacity: 0}))
        ])
      ]
    )
  ],
})
export class NavItemComponent extends ItemComponent {

  xCoord = -10000;
  yCoord = -10000;
  nodes = [];
  innerNodes = [];

  @Input() menuReference: any;
  @Output() coordsChange = new EventEmitter();

  public lastNameField: FormControl;

  public companyField: FormControl;

  public onDelete($event: MouseEvent): void {
    this.store.dispatch(this.treeActionsService.deleteNode(this.treeModel.treeId, this.node));
    this.clickEvent();
  }

  public onEdit($event: MouseEvent): void {
    this.store.dispatch(this.treeActionsService.editNodeStart(this.node));
    this.clickEvent();
  }

  clickEvent() {
    this.xCoord = -10000;
    this.yCoord = -10000;
    contextMenu.state.next({x: -10000, y: -10000, node: null});
  }

  clickRow(e, node) {

    this.nodes.push(node);
    e.preventDefault();
    e.stopPropagation();
    this.clickInnerRow(e, node);
    this.xCoord = e.offsetX;
    this.yCoord = e.offsetY;
    contextMenu.state.next({x: e.x, y: e.y, node});
    return false;
  }

  clickInnerRow(e, node) {
    this.coordsChange.emit({x: e.x, y: e.y, node});
  }

}
