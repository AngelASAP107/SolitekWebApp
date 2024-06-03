import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-user-edit',
  templateUrl: './user-edit.component.html',
  styleUrls: ['./user-edit.component.css']
})
export class UserEditComponent implements OnInit {
  menuVisible: boolean = false;
  user: User | null = null;
  userForm: any = {};
  editing: any = {
    nombre: false,
    correo_electronico: false,
    telefono: false,
    direccion: false
  };

  constructor(private route: ActivatedRoute, private router: Router, private userService: UserService) { }

  ngOnInit(): void {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.loadUser(+userId);
    }
  }

  toggleMenu(): void {
    this.menuVisible = !this.menuVisible;
  }

  navigateTo(route: string): void {
    this.router.navigate([route]);
    this.menuVisible = false;
  }

  logout(): void {
    this.menuVisible = false;
  }

  loadUser(id: number): void {
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
      this.userForm = { ...user };
    });
  }

  toggleEdit(field: string): void {
    this.editing[field] = !this.editing[field];
    if (!this.editing[field]) {
      this.saveChanges();
    }
  }

  saveChanges(): void {
    if (this.user) {
      this.userService.updateUser(this.user.usuario_id!, this.userForm).subscribe(() => {
        this.router.navigate(['/manage-users']); // Redirigir a la gestión de usuarios después de guardar
      });
    }
  }
}
