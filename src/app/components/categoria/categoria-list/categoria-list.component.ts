import { Component, Input, Output, EventEmitter, inject } from "@angular/core";
import { ICategoria } from "../../../interfaces";
import { AuthService } from "../../../services/auth.service";
import { CommonModule } from "@angular/common";

@Component({
  selector: "app-categoria-list",
  templateUrl: "./categoria-list.component.html",
  styleUrl: "./categoria-list.component.scss",
  standalone: true,
  imports: [CommonModule],
})
export class CategoriaListComponent {
  @Input() categorias: ICategoria[] = [];
  @Output() edit = new EventEmitter<ICategoria>();
  @Output() delete = new EventEmitter<ICategoria>();
  authService = inject(AuthService);

  canEditOrDelete() {
    return this.authService.isSuperAdmin();
  }
}
