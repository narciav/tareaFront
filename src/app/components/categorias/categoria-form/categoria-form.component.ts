import { Component, EventEmitter, Input, Output, inject, OnChanges, SimpleChanges } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ICategoria } from '../../../interfaces';
import { CategoriaService } from '../../../services/categoria.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-categorias-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './categoria-form.component.html',
  styleUrls: ['./categoria-form.component.scss'] 
})
export class CategoriasFormComponent implements OnChanges {
  @Input() categoria: ICategoria | null = null;
  @Output() saved = new EventEmitter<void>();
  @Output() cancel = new EventEmitter<void>();

  private fb = inject(FormBuilder);
  private categoriaService = inject(CategoriaService);

  form: FormGroup = this.fb.group({
    id: [],
    nombre: ['', Validators.required],
    descripcion: ['', Validators.required]
  });

  ngOnChanges(changes: SimpleChanges) {
    if (changes['categoria'] && this.categoria) {
      this.form.patchValue(this.categoria);
    } else {
      this.form.reset();
    }
  }

  save() {
    if (this.form.invalid) return;
    const value = this.form.value;
    if (value.id) {
      this.categoriaService.update(value);
    } else {
      this.categoriaService.save(value);
    }
    this.saved.emit();
    this.form.reset();
  }

  onCancel() {
    this.cancel.emit();
    this.form.reset();
  }
}