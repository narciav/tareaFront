import { inject, Injectable, signal } from '@angular/core';
import { BaseService } from './base-service';
import { ICategoria, ISearch } from '../interfaces';
import { AlertService } from './alert.service';

@Injectable({
  providedIn: 'root'
})
export class CategoriaService extends BaseService<ICategoria> {
  protected override source: string = 'categorias';
  private categoriaListSignal = signal<ICategoria[]>([]);
  public search: ISearch = { page: 1, size: 5 };
  public totalItems: any = [];
  private alertService: AlertService = inject(AlertService);

  get categorias$() {
    return this.categoriaListSignal;
  }

  getAll() {
    this.findAllWithParams({ page: this.search.page, size: this.search.size }).subscribe({
      next: (response: any) => {
        this.search = { ...this.search, ...response.meta };
        this.totalItems = Array.from({ length: this.search.totalPages ?? 0 }, (_, i) => i + 1);
        this.categoriaListSignal.set(response.data);
      },
      error: () => {
        this.alertService.displayAlert('error', 'Error cargando categorías');
      }
    });
  }

  save(categoria: ICategoria) {
    this.add(categoria).subscribe({
      next: () => {
        this.alertService.displayAlert('success', 'Categoría creada');
        this.getAll();
      },
      error: () => {
        this.alertService.displayAlert('error', 'Error creando categoría');
      }
    });
  }

  update(categoria: ICategoria) {
    this.edit(categoria.id, categoria).subscribe({
      next: () => {
        this.alertService.displayAlert('success', 'Categoría actualizada');
        this.getAll();
      },
      error: () => {
        this.alertService.displayAlert('error', 'Error actualizando categoría');
      }
    });
  }

  delete(categoria: ICategoria) {
    this.del(categoria.id).subscribe({
      next: () => {
        this.alertService.displayAlert('success', 'Categoría eliminada');
        this.getAll();
      },
      error: () => {
        this.alertService.displayAlert('error', 'Error eliminando categoría');
      }
    });
  }
}