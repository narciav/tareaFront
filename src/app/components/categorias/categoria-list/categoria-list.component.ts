import { Component, Input, Output, EventEmitter } from '@angular/core';
import { ICategoria } from '../../../interfaces';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categoria-list',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categoria-list.component.html',
  styleUrls: ['./categoria-list.component.scss']
})
export class CategoriaListComponent {
  @Input() categorias: ICategoria[] = [];
  @Input() areActionsAvailable: boolean = false;
  @Output() callModalAction = new EventEmitter<ICategoria>();
  @Output() callDeleteAction = new EventEmitter<ICategoria>();
}