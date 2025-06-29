import { Component, inject, ViewChild } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategoria } from '../../interfaces';

@Component({
  selector: 'app-categorias',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
  standalone: true,
  imports: []
})
export class CategoriasComponent {
  categoriaService = inject(CategoriaService);
  modalService = inject(ModalService);
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  @ViewChild('addCategoriaModal') addCategoriaModal: any;

  categoriaForm = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: [''],
  });

  constructor() {
    this.categoriaService.search.page = 1;
    this.categoriaService.getAll();
  }

  saveCategoria(categoria: ICategoria) {
    this.categoriaService.save(categoria);
    this.modalService.closeAll();
  }

  callEdition(categoria: ICategoria) {
    this.categoriaForm.patchValue(categoria);
    this.modalService.displayModal('md', this.addCategoriaModal);
  }

  updateCategoria(categoria: ICategoria) {
    this.categoriaService.update(categoria);
    this.modalService.closeAll();
  }
}