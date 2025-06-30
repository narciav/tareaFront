import { Component, inject, ViewChild } from '@angular/core';
import { CategoriaService } from '../../services/categoria.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { ICategoria } from '../../interfaces';
import { CategoriaListComponent } from '../../components/categoria/categoria-list/categoria-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { CategoriaFormComponent } from '../../components/categoria/categoria-form/categoria-form.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-categorias',
  templateUrl: './categoria.component.html',
  styleUrl: './categoria.component.scss',
  standalone: true,
  imports: [
    CategoriaListComponent,
    PaginationComponent,
    CategoriaFormComponent,
    ModalComponent,
    LoaderComponent
  ]
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

  selectedCategoria: ICategoria | null = null;

  constructor() {
    this.categoriaService.search.page = 1;
    this.categoriaService.getAll();
  }

  saveCategoria(categoria: ICategoria) {
    this.categoriaService.save(categoria);
    this.modalService.closeAll();
    this.selectedCategoria = null;
    this.categoriaForm.reset();
  }

  callEdition(categoria: ICategoria) {
    this.selectedCategoria = { ...categoria };
    this.categoriaForm.patchValue({
      ...categoria,
      id: categoria.id !== undefined && categoria.id !== null ? String(categoria.id) : null
    });
    this.modalService.displayModal('md', this.addCategoriaModal);
  }

  updateCategoria(categoria: ICategoria) {
    this.categoriaService.update(categoria);
    this.modalService.closeAll();
    this.selectedCategoria = null;
    this.categoriaForm.reset();
  }

openAddCategoriaModal() {
  this.selectedCategoria = null;
  this.categoriaForm.reset();
  this.modalService.displayModal('md', this.addCategoriaModal);
}
}