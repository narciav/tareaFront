import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ICategoria } from '../../../interfaces';
import { ReactiveFormsModule } from '@angular/forms';


@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.scss',
  standalone: true,
  imports: [ReactiveFormsModule]
})
export class CategoriaFormComponent {
  @Input() categoriaForm!: FormGroup;
  @Output() save = new EventEmitter<ICategoria>();
  @Output() update = new EventEmitter<ICategoria>();

  submit() {
    const value = this.categoriaForm.value;
    const categoria: ICategoria = {
      id: value.id ? Number(value.id) : undefined,
      nombre: value.nombre ?? undefined,
      descripcion: value.descripcion ?? undefined
    };
    if (categoria.id) {
      this.update.emit(categoria);
    } else {
      this.save.emit(categoria);
    }
  }
}