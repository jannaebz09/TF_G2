import { CommonModule, NgIf } from '@angular/common';
import { Component } from '@angular/core';
import { 
  FormBuilder, 
  FormControl, 
  FormGroup, 
  ReactiveFormsModule, 
  Validators 
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { Comment } from '../../../models/Comment';
import moment from 'moment';
import { User } from '../../../models/User';
import { SpRecipe } from '../../../models/Sp-recipe';
import { CommentService } from '../../../services/comment.service';
import { UserService } from '../../../services/user.service';
import { SpRecipeService } from '../../../services/sp-recipe.service';

@Component({
  selector: 'app-creaeditacomment',
  standalone: true,
  imports: [MatButtonModule,
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
  templateUrl: './creaeditacomment.component.html',
  styleUrl: './creaeditacomment.component.css'
})
export class CreaeditacommentComponent {
  form: FormGroup = new FormGroup({});
  s: Comment = new Comment();
  maxFecha: Date = moment().startOf('day').toDate();
  minFecha: Date = moment().startOf('day').toDate();
  listaUsuarios: User[] = [];
  listaDescripcionReceta: SpRecipe[] = [];
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private cS: CommentService,
    private router: Router,
    private uS: UserService,
    private eS: SpRecipeService,
    private route: ActivatedRoute
  ) { }

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
      c5: ['', [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern('^[0-9]+$')]],
      c6: ['', Validators.required],
      c7: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.eS.list().subscribe((data) => {
      this.listaDescripcionReceta = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.s.idComment = this.form.value.c1;
      this.s.userType = this.form.value.c2;
      this.s.textComment = this.form.value.c3;
      this.s.dateComment = this.form.value.c4;
      this.s.qualification = this.form.value.c5;
      this.s.user.idUser = this.form.value.c6;
      this.s.spRecipe.idSpecialRecipe = this.form.value.c7;
      this.cS.insert(this.s).subscribe((data) => {
        this.cS.list().subscribe((data) => {
          this.cS.setList(data);
        });
      });
      this.router.navigate(['comment']);
    }
  }
  init() {
    if (this.edicion) {
      this.cS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          c1: new FormControl(data.idComment),
          c2: new FormControl(data.userType),
          c3: new FormControl(data.textComment),
          c4: new FormControl(data.dateComment),
          c5: new FormControl(data.qualification),
          c6: new FormControl(data.user.idUser),
          c7: new FormControl(data.spRecipe.idSpecialRecipe),
        });
      });
    }
  }
}
