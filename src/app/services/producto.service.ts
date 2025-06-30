import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ISearch, IProducto } from '../interfaces';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class ProductoService extends BaseService<IProducto> {
  protected override source: string = 'productos';
  private productoListSignal = signal<IProducto[]>([]);
  get productos$() { return this.productoListSignal; }
  public search: ISearch = { page: 1, size: 5 };
  public totalItems: any = [];
  private alertService: AlertService = inject(AlertService);

getAll() {
  this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
    next: (response: any) => {
      const productos = Array.isArray(response) ? response : response.data;
      this.productoListSignal.set(productos);
      if (response.meta) {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
      }
    }
  });
}

  save(producto: IProducto) {
    this.add(producto).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      }
    });
  }

  update(producto: IProducto) {
    this.editCustomSource(`${producto.id}`, producto).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      }
    });
  }

  delete(producto: IProducto) {
    this.delCustomSource(`${producto.id}`).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      }
    });
  }
}