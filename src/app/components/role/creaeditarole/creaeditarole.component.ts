import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role.service';
import { Router, RouterLink } from '@angular/router';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';

@Component({
  selector: 'app-creaeditarole',
  standalone: true,
  imports: [MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,],
  templateUrl: './creaeditarole.component.html',
  styleUrl: './creaeditarole.component.css'
})
export class CreaeditaroleComponent {
  form: FormGroup = new FormGroup({});
  r: Role = new Role();
  listaUsuarios: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private rS: RoleService,
    private router: Router,
    private uS: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      c1: ['', Validators.required],
      c2: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.r.descriptionRole = this.form.value.c1;
      this.r.user.idUser = this.form.value.c2;
      this.rS.insert(this.r).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['role']);
    }
  }

}
