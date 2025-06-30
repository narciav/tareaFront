import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { IProducto, ICategoria } from '../../../interfaces';
import { FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.scss',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule]
})
export class ProductoFormComponent implements OnChanges {
  @Input() producto: IProducto | null = null;
  @Input() categorias: ICategoria[] = [];
  @Output() save = new EventEmitter<IProducto>();
  @Output() update = new EventEmitter<IProducto>();

  fb = inject(FormBuilder);

  form = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: [''],
    precio: ['', Validators.required],
    cantidad: ['', Validators.required],
    categoriaId: ['', Validators.required],
  });

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['producto'] && this.producto) {
      this.form.patchValue({
        ...this.producto,
        id: this.producto.id !== undefined && this.producto.id !== null ? String(this.producto.id) : null,
        categoriaId: this.producto.categoriaId !== undefined && this.producto.categoriaId !== null ? String(this.producto.categoriaId) : null,
        precio: this.producto.precio !== undefined && this.producto.precio !== null ? String(this.producto.precio) : null,
        cantidad: this.producto.cantidad !== undefined && this.producto.cantidad !== null ? String(this.producto.cantidad) : null
      });
    } else if (changes['producto'] && !this.producto) {
      this.form.reset();
    }
  }

  submit() {
    const value = this.form.value;
    const producto: IProducto = {
      id: value.id ? Number(value.id) : undefined,
      nombre: value.nombre ?? undefined,
      descripcion: value.descripcion ?? undefined,
      precio: value.precio ? Number(value.precio) : undefined,
      cantidad: value.cantidad ? Number(value.cantidad) : undefined,
      categoriaId: value.categoriaId ? Number(value.categoriaId) : undefined
    };
    if (producto.id) {
      this.update.emit(producto);
    } else {
      this.save.emit(producto);
    }
  }
}