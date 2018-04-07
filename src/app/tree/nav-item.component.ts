import {Component, ElementRef, ViewChild} from '@angular/core';
import {ItemComponent} from '@rign/angular2-tree';
import {animate, style, transition, trigger} from '@angular/animations';

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
  }

  clickRow(e) {
    console.log('row clicked', e);
    this.xCoord = e.offsetX;
    this.yCoord = e.offsetY;
    return false;
  }

}
