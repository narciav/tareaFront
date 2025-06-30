import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ISearch, ICategoria } from '../interfaces';
import { AlertService } from './alert.service';

@Injectable({ providedIn: 'root' })
export class CategoriaService extends BaseService<ICategoria> {
  protected override source: string = 'categorias';
  private categoriaListSignal = signal<ICategoria[]>([]);
  get categorias$() { return this.categoriaListSignal; }
  public search: ISearch = { page: 1, size: 5 };
  public totalItems: any = [];
  private alertService: AlertService = inject(AlertService);

getAll() {
  this.findAllWithParams({ page: this.search.page || 1, size: this.search.size || 5 }).subscribe({
    next: (response: any) => {
      const categorias = Array.isArray(response) ? response : response.data;
      this.categoriaListSignal.set(categorias);
      if (response.meta) {
        this.search = {
          ...this.search,
          ...response.meta,
          page: Number(response.meta?.page) || 1,
          size: Number(response.meta?.size) || 5
        };
        this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
      }
    }
  });
}

  save(categoria: ICategoria) {
    this.add(categoria).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      }
    });
  }

  update(categoria: ICategoria) {
    this.editCustomSource(`${categoria.id}`, categoria).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      }
    });
  }

  delete(categoria: ICategoria) {
    this.delCustomSource(`${categoria.id}`).subscribe({
      next: (response: any) => {
        this.alertService.displayAlert('success', response.message, 'center', 'top', ['success-snackbar']);
        this.getAll();
      }
    });
  }
}