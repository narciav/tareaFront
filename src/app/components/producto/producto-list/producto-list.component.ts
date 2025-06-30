import { Component, Input, Output, EventEmitter, inject } from "@angular/core";
import { IProducto, ICategoria } from "../../../interfaces";
import { AuthService } from "../../../services/auth.service";

@Component({
  selector: "app-producto-list",
  templateUrl: "./producto-list.component.html",
  styleUrl: "./producto-list.component.scss",
  standalone: true,
  imports: [],
})
export class ProductoListComponent {
  @Input() productos: IProducto[] = [];
  @Input() categorias: ICategoria[] = [];
  @Output() edit = new EventEmitter<IProducto>();
  @Output() delete = new EventEmitter<IProducto>();
  authService = inject(AuthService);

  canEditOrDelete() {
    return this.authService.isSuperAdmin();
  }

  getCategoriaNombre(id: number) {
    return this.categorias.find((cat) => cat.id === id)?.nombre ?? "";
  }
}
