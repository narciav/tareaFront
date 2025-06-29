import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { IProducto, ISearch } from '../interfaces';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class ProductoService extends BaseService<IProducto> {
  protected override source: string = 'productos';
  private productoListSignal = signal<IProducto[]>([]);
  public search: ISearch = { page: 1, size: 5 };
  public totalItems: any = [];
  private alertService: AlertService = inject(AlertService);

  get productos$() {
    return this.productoListSignal;
  }

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (response: any) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ?? 0 }, (_, i) => i + 1);
        this.productoListSignal.set(response.data);
      },
      error: () => {
        this.alertService.displayAlert('error', 'Error cargando productos');
      }
    });
  }

  save(producto: IProducto) {
    this.add(producto).subscribe({
      next: () => {
        this.alertService.displayAlert('success', 'Producto creado');
        this.getAll();
      },
      error: () => {
        this.alertService.displayAlert('error', 'Error creando producto');
      }
    });
  }

  update(producto: IProducto) {
    this.edit(producto.id, producto).subscribe({
      next: () => {
        this.alertService.displayAlert('success', 'Producto actualizado');
        this.getAll();
      },
      error: () => {
        this.alertService.displayAlert('error', 'Error actualizando producto');
      }
    });
  }

  delete(producto: IProducto) {
    this.del(producto.id).subscribe({
      next: () => {
        this.alertService.displayAlert('success', 'Producto eliminado');
        this.getAll();
      },
      error: () => {
        this.alertService.displayAlert('error', 'Error eliminando producto');
      }
    });
  }
}