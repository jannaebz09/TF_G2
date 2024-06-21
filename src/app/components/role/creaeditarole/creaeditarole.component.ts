import { Component } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { Role } from '../../../models/Role';
import { RoleService } from '../../../services/role.service';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatFormFieldModule } from '@angular/material/form-field';
import { CommonModule } from '@angular/common';
import { MatNativeDateModule } from '@angular/material/core';
import { MatInputModule } from '@angular/material/input';
import { LoginService } from '../../../services/login.service';

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
  edicion: boolean = false;
  id: number = 0;
  currentUser:User=new User();

  c2: { value: String; viewValue: String }[] = [
    { value: 'EXPERTO', viewValue: 'EXPERTO' },
    { value: 'CLIENTE', viewValue: 'CLIENTE' },
  ];
  constructor(
    private formBuilder: FormBuilder,
    private rS: RoleService,
    private router: Router,
    private uS: UserService,
    private route: ActivatedRoute,
    private lS:LoginService
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      c1: [''],
      c2: ['', Validators.required],
      c3: [{ value: '', disabled: true }, Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    const username = this.lS.showName();
    if (username) {
      this.uS.userlogin(username).subscribe({
        next: (user) => {
          this.currentUser = user; 
          this.form.patchValue({
            c3: this.currentUser.idUser
          });
        },
        error: (err) => {
          console.error('Error fetching user data', err);
        }
      });
    }
  }
  registrar(): void {
    if (this.form.valid) {
      this.r.idRole = this.form.value.c1;
      this.r.descriptionRole = this.form.value.c2;
      this.r.user.idUser = this.currentUser.idUser;
      this.rS.insert(this.r).subscribe((data) => {
        this.rS.list().subscribe((data) => {
          this.rS.setList(data);
        });
      });
      this.router.navigate(['role']);
    }
  }
  init() {
    if (this.edicion) {
      this.rS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          c1: new FormControl(data.idRole),
          c2: new FormControl(data.descriptionRole),
          c3: new FormControl(data.user.idUser),
        });
      });
    }
  }

}
