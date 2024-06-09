import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { ExpCertificate } from '../../../models/ExpCertificate';
import { User } from '../../../models/User';
import { ExpcertificateService } from '../../../services/expcertificate.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-creaeditaexpcertificate',
  standalone: true,
  imports: [MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule],
  templateUrl: './creaeditaexpcertificate.component.html',
  styleUrl: './creaeditaexpcertificate.component.css'
})
export class CreaeditaexpcertificateComponent {
  form: FormGroup = new FormGroup({});
  e: ExpCertificate = new ExpCertificate();
  listaUsuarios: User[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private eS: ExpcertificateService,
    private router: Router,
    private uS: UserService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      c1: ['', Validators.required],
      c2: ['', Validators.required],
      c3: ['', Validators.required],
      c4: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.e.uniqueCodeCertificate = this.form.value.c1;
      this.e.institutionName = this.form.value.c2;
      this.e.certificateTitle = this.form.value.c3;
      this.e.user.idUser = this.form.value.c4;
      this.eS.insert(this.e).subscribe((data) => {
        this.eS.list().subscribe((data) => {
          this.eS.setList(data);
        });
      });
      this.router.navigate(['expcertificate']);
    }
  }
}
