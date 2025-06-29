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

  ngOnChanges(changes: SimpleChanges) {
    if (this.categoria) this.form.patchValue(this.categoria);
    else this.form.reset();
  }

  submit() {
    if (this.form.value.id) this.update.emit(this.form.value as ICategoria);
    else this.save.emit(this.form.value as ICategoria);
  }
}