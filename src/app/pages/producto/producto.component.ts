import { Component, inject, ViewChild } from '@angular/core';
import { ProductoService } from '../../services/producto.service';
import { CategoriaService } from '../../services/categoria.service';
import { AuthService } from '../../services/auth.service';
import { ModalService } from '../../services/modal.service';
import { FormBuilder, Validators } from '@angular/forms';
import { IProducto } from '../../interfaces';
import { ProductoListComponent } from '../../components/producto/producto-list/producto-list.component';
import { PaginationComponent } from '../../components/pagination/pagination.component';
import { ProductoFormComponent } from '../../components/producto/producto-form/producto-form.component';
import { ModalComponent } from '../../components/modal/modal.component';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-productos',
  templateUrl: './producto.component.html',
  styleUrl: './producto.component.scss',
  standalone: true,
  imports: [
    ProductoListComponent,
    PaginationComponent,
    ProductoFormComponent,
    ModalComponent,
    LoaderComponent
  ]
})
export class ProductosComponent {
  productoService = inject(ProductoService);
  categoriaService = inject(CategoriaService);
  modalService = inject(ModalService);
  authService = inject(AuthService);
  fb = inject(FormBuilder);

  @ViewChild('addProductoModal') addProductoModal: any;

  productoForm = this.fb.group({
    id: [''],
    nombre: ['', Validators.required],
    descripcion: [''],
    precio: ['', Validators.required],
    cantidad: ['', Validators.required],
    categoriaId: ['', Validators.required],
  });

  selectedProducto: IProducto | null = null;

  constructor() {
    this.productoService.search.page = 1;
    this.productoService.getAll();
    this.categoriaService.getAll();
  }

  saveProducto(producto: IProducto) {
    this.productoService.save(producto);
    this.modalService.closeAll();
    this.selectedProducto = null;
    this.productoForm.reset();
  }


  updateProducto(producto: IProducto) {
    this.productoService.update(producto);
    this.modalService.closeAll();
    this.selectedProducto = null;
    this.productoForm.reset();
  }
  openAddProductoModal() {
  this.selectedProducto = null;
  this.productoForm.reset();
  this.modalService.displayModal('md', this.addProductoModal);
}
}