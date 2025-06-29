import { Component, EventEmitter, Input, Output, inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { IProducto, ICategoria } from '../../../interfaces';
import { ProductoService } from '../../../services/producto.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-product-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './producto-form.component.html',
  styleUrls: ['./producto-form.component.scss'] 
})
export class ProductFormComponent implements OnChanges {
  @Input() producto: IProducto | null = null;
  @Input() categorias: ICategoria[] = [];
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private productoService = inject(ProductoService);

  form: FormGroup = this.fb.group({
    id: [],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required],
    precio: [0, [Validators.required, Validators.min(0.01)]],
    cantidad: [0, [Validators.required, Validators.min(1)]],
    categoria: [null, Validators.required]
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['producto'] && this.producto) {
      this.form.patchValue(this.producto);
    } else {
      this.form.reset();
    }
  }

  save() {
    if (this.form.invalid) return;
    const value = this.form.value;
    if (value.id) {
      this.productoService.update(value);
    } else {
      this.productoService.save(value);
    }
    this.saved.emit();
    this.form.reset();
  }

  onCancel() {
    this.cancel.emit();
    this.form.reset();
  }
}