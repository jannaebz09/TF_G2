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
import { User } from '../../../models/User';
import { UserService } from '../../../services/user.service';
import moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { SpRecipe } from '../../../models/Sp-recipe';
import { SpRecipeService } from '../../../services/sp-recipe.service';

@Component({
  selector: 'app-creaeditasp-recipe',
  standalone: true,
  imports: [
    MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
    NgIf,
  ],
  templateUrl: './creaeditasp-recipe.component.html',
  styleUrl: './creaeditasp-recipe.component.css'
})
export class CreaeditaspRecipeComponent {
  form: FormGroup = new FormGroup({});
  s: SpRecipe = new SpRecipe();
  maxFecha: Date = moment().add(-1, 'days').toDate();
  listaUsuarios: User[] = [];
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private sS: SpRecipeService,
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
      this.s.idSpecialRecipe = this.form.value.c1;
      this.s.description = this.form.value.c2;
      this.s.shippingDate = this.form.value.c3;
      this.s.user.idUser = this.form.value.c4;
      this.sS.insert(this.s).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });
      this.router.navigate(['sp-recipe']);
    }
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          c1: new FormControl(data.idSpecialRecipe),
          c2: new FormControl(data.description),
          c3: new FormControl(data.shippingDate),
          c4: new FormControl(data.user.idUser),
        });
      });
    }
  }
}
