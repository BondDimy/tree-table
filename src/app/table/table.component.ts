import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {MatPaginator, MatTableDataSource} from '@angular/material';
import {TableService} from './table.service';
import '../../../node_modules/@swimlane/ngx-datatable/release/index.js';
import '../../../node_modules/@swimlane/ngx-datatable/release/index.css';


@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class TableComponent implements AfterViewInit {

  listData;

  xCoord = -10000;
  yCoord = -10000;

  @ViewChild('mydatatable') table: any;
  @ViewChild('tooltip') tooltip;

  rows = [
    {id: 1, name: 'Austin', gender: 'Male', company: 'Swimlane', treeId: 'tree2', parentId: null},
    {id: 2, name: 'Dany', gender: 'Male', company: 'KFC', treeId: 'tree2', parentId: null},
    {id: 3, name: 'Molly', gender: 'Female', company: 'Burger King', treeId: 'tree2', parentId: null},
    {id: 4, name: 'Austin', gender: 'Male', company: 'Swimlane', parentId: 1, treeId: 'tree2'},
  ];
  columns = [
    {prop: 'name'},
    {name: 'Gender'},
    {name: 'Company'}
  ];

  selected = [];
  editing = {};
  rawEvent: any;
  contextmenuRow: any;
  contextmenuColumn: any;
  expanded: any = {};
  timeout: any;

// tree


  // tree

  constructor(
    private tableService: TableService
  ) {
  }

  ngAfterViewInit() {
  }

  async loadData() {
    const resp = await this.tableService.loadList(2);
    this.listData = resp.rows;
    console.log(resp.rows);
  }


  updateValue(event, cell, rowIndex) {
    console.log('inline editing rowIndex', rowIndex);
    this.editing[rowIndex + '-' + cell] = false;
    this.rows[rowIndex][cell] = event.target.value;
    this.rows = [...this.rows];
    console.log('UPDATED!', this.rows[rowIndex][cell]);
  }

  onTableContextMenu(contextMenuEvent) {
    console.log(contextMenuEvent.event.clientX, contextMenuEvent.event.clientY);

    this.rawEvent = contextMenuEvent.event;
    if (contextMenuEvent.type === 'body') {
      this.contextmenuRow = contextMenuEvent.content;
      this.contextmenuColumn = undefined;
    } else {
      this.contextmenuColumn = contextMenuEvent.content;
      this.contextmenuRow = undefined;
    }

    this.xCoord = contextMenuEvent.event.clientX;
    this.yCoord = contextMenuEvent.event.clientY;

    contextMenuEvent.event.preventDefault();
    contextMenuEvent.event.stopPropagation();

    return false;
  }


  onSelect({selected}) {
    console.log('Select Event', selected, this.selected);

    this.selected.splice(0, this.selected.length);
    this.selected.push(...selected);
  }

  onActivate(event) {
    console.log('Activate Event', event);
  }

  add() {
    this.selected.push(this.rows[1], this.rows[3]);
  }

  update() {
    this.selected = [this.rows[1], this.rows[3]];
  }

  remove() {
    this.selected = [];
  }

  displayCheck(row) {
    return row.name !== 'Ethel Price';
  }

  toggleExpandRow(row) {
    console.log('Toggled Expand Row!', row);
    this.table.rowDetail.toggleExpandRow(row);
  }

  onDetailToggle(event) {
    console.log('Detail Toggled', event);
  }

  onPage(event) {
    clearTimeout(this.timeout);
    this.timeout = setTimeout(() => {
      console.log('paged!', event);
    }, 100);
  }

  clickEvent() {
    this.xCoord = -10000;
    this.yCoord = -10000;
  }

  allowDrop(event) {
    console.log('allowDrop', event);
  }


}

export interface Element {
  OrderID: string;
  CustomerID: string;
  OrderDate: string;
  Freight: string;
  ShipName: string;
}



