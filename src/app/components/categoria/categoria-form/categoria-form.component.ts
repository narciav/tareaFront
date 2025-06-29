import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { ICategoria } from '../../../interfaces';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-categoria-form',
  templateUrl: './categoria-form.component.html',
  styleUrl: './categoria-form.component.scss',
  standalone: true,
  imports: []
})
export class CategoriaFormComponent implements OnChanges {
  @Input() categoria: ICategoria | null = null;
  @Output() save = new EventEmitter<ICategoria>();
  @Output() update = new EventEmitter<ICategoria>();

  fb = inject(FormBuilder);

  form = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: [''],
  });

ngOnChanges(changes: SimpleChanges): void {
  if (changes['categoria'] && this.categoria) {
    this.form.patchValue({
      ...this.categoria,
      id: this.categoria.id !== undefined && this.categoria.id !== null ? String(this.categoria.id) : null
    });
  } else if (changes['categoria'] && !this.categoria) {
    this.form.reset();
  }
}

submit() {
  const value = this.form.value;
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