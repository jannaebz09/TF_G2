import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { ExpCertificate } from '../../../models/ExpCertificate';
import { User } from '../../../models/User';
import { ExpcertificateService } from '../../../services/expcertificate.service';
import { UserService } from '../../../services/user.service';

@Component({
  selector: 'app-creaeditaexpcertificate',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './creaeditaexpcertificate.component.html',
  styleUrl: './creaeditaexpcertificate.component.css',
})
export class CreaeditaexpcertificateComponent {
  form: FormGroup = new FormGroup({});
  e: ExpCertificate = new ExpCertificate();
  listaUsuarios: User[] = [];
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private eS: ExpcertificateService,
    private router: Router,
    private uS: UserService,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.route.params.subscribe((data: Params) => {
      this.id = data['id'];
      this.edicion = data['id'] != null;
      this.init();
    });
    this.form = this.formBuilder.group({
      c1: [''],
      c2: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      c3: ['', Validators.required],
      c4: ['', Validators.required],
      c5: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.e.idExpCertificate=this.form.value.c1;
      this.e.uniqueCodeCertificate = this.form.value.c2;
      this.e.institutionName = this.form.value.c3;
      this.e.certificateTitle = this.form.value.c4;
      this.e.user.idUser = this.form.value.c5;
      this.eS.insert(this.e).subscribe((data) => {
        this.eS.list().subscribe((data) => {
          this.eS.setList(data);
        });
      });
      this.router.navigate(['expcertificate']);
    }
  }
  init() {
    if (this.edicion) {
      this.eS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          c1: new FormControl(data.idExpCertificate),
          c2: new FormControl(data.uniqueCodeCertificate),
          c3: new FormControl(data.institutionName),
          c4: new FormControl(data.certificateTitle),
          c5: new FormControl(data.user.idUser),
        });
      });
    }
  }
}
