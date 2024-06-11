import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormGroupDirective, FormsModule, NgForm, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { ErrorStateMatcher, MatNativeDateModule, ShowOnDirtyErrorStateMatcher } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-creaeditauser',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
    MatIconModule
  ],
  templateUrl: './creaeditauser.component.html',
  styleUrls: ['./creaeditauser.component.css'],
})

export class CreaeditauserComponent implements OnInit, ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
  form: FormGroup = new FormGroup({});
  u: User = new User();
  edicion: boolean = false;
  id: number = 1;

  c5: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Habilitado' },
    { value: false, viewValue: 'Deshabilitado' },
  ];
  c6: { value: boolean; viewValue: string }[] = [
    { value: true, viewValue: 'Experto' },
    { value: false, viewValue: 'Cliente' },
  ];
  matcher = new ErrorStateMatcher();
  hide = true;

  clickEvent(event: MouseEvent) {
    this.hide = !this.hide;
    event.stopPropagation();
  }

  constructor(
    private formBuilder: FormBuilder,
    private uS: UserService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({

      c0:[''],
      c1: ['', Validators.required],
      c2: ['', Validators.required],
      c3: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      c4: ['', Validators.required],
      c5: ['', Validators.required],
      c6: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }

  registrar(): void {
    if (this.form.valid) {
      this.u.idUser = this.form.value.c0;
      this.u.userName = this.form.value.c1;
      this.u.fullName = this.form.value.c2;
      this.u.email = this.form.value.email;
      this.u.password = this.form.value.password;
      this.u.dni = this.form.value.c3;
      this.u.symptoms = this.form.value.c4;
      this.u.enabled = this.form.value.c5;
      this.u.verificationExpert = this.form.value.c6;
      this.uS.insert(this.u).subscribe((data) => {
        this.uS.list().subscribe((data) => {
          this.uS.setList(data);
        });
      });
      this.router.navigate(['user']);
    }
  }
  init() {
    if (this.edicion) {
      this.uS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          c0: new FormControl(data.idUser),
          c1: new FormControl(data.userName),
          c2: new FormControl(data.fullName),
          email: new FormControl(data.email),
          password: new FormControl(data.password),
          c3: new FormControl(data.dni),
          c4: new FormControl(data.symptoms),
          c5: new FormControl(data.enabled),
          c6: new FormControl(data.verificationExpert),
        });
      });
    }
  }
}
