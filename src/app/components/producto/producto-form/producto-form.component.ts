import { Component, Input, Output, EventEmitter, inject, OnChanges, SimpleChanges } from '@angular/core';
import { IProducto, ICategoria } from '../../../interfaces';
import { FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-producto-form',
  templateUrl: './producto-form.component.html',
  styleUrl: './producto-form.component.scss',
  standalone: true,
  imports: []
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

  ngOnChanges(changes: SimpleChanges) {
    if (this.producto) this.form.patchValue(this.producto);
    else this.form.reset();
  }

  submit() {
    if (this.form.value.id) this.update.emit(this.form.value as IProducto);
    else this.save.emit(this.form.value as IProducto);
  }
}