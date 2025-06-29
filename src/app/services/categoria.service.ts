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
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (response: any) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ? this.search.totalPages : 0 }, (_, i) => i + 1);
        this.categoriaListSignal.set(response.data);
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