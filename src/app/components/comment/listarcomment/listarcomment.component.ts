import { Component, OnInit, ViewChild } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableModule } from '@angular/material/table';
import { Router, RouterLink } from '@angular/router';
import { CommentService } from '../../../services/comment.service';
import { Comment } from '../../../models/Comment';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { DateAdapter, MatNativeDateModule } from '@angular/material/core';
import moment from 'moment';
import { User } from '../../../models/User';
import { SpRecipe } from '../../../models/Sp-recipe';
import { UserService } from '../../../services/user.service';
import { SpRecipeService } from '../../../services/sp-recipe.service';
import { MatInputModule } from '@angular/material/input';
import { MatCardModule } from '@angular/material/card';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-listarcomment',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule, 
    MatFormFieldModule, 
    MatPaginatorModule, 
    MatIconModule, 
    RouterLink, 
    MatSelectModule, 
    MatButtonModule, 
    ReactiveFormsModule, 
    MatInputModule, 
    MatDatepickerModule, 
    MatNativeDateModule, 
    MatCardModule,
  ],
  templateUrl: './listarcomment.component.html',
  styleUrls: ['./listarcomment.component.css']
})
export class ListarcommentComponent implements OnInit {
  dataSource: Comment[] = [];
  form: FormGroup;
  s: Comment = new Comment();
  listaUsuarios: User[] = [];
  listaDescripcionReceta: SpRecipe[] = [];
  edicion: boolean = false;
  currentUser: User = new User();

  @ViewChild(MatPaginator) paginator!: MatPaginator;

  constructor(
    private cS: CommentService,
    private router: Router,
    private formBuilder: FormBuilder,
    private uS: UserService,
    private eS: SpRecipeService,
    private lS: LoginService,
  ) { 
    this.form = this.formBuilder.group({
      c1: [''],
      c2: ['', Validators.required],
      c3: [{ value: new Date(), disabled: true }, Validators.required],
      c4: ['', [Validators.required, Validators.min(1), Validators.max(5), Validators.pattern('^[0-9]+$')]],
      c5: [{ value: '', disabled: true }, Validators.required],
      c6: ['', Validators.required],
    });
  }

  ngOnInit(): void {
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });

    this.eS.list().subscribe((data) => {
      this.listaDescripcionReceta = data;
    });
    this.loadComments();

    const username = this.lS.showName();
    if (username) {
      this.uS.userlogin(username).subscribe({
        next: (user) => {
          this.currentUser = user; 
          this.form.patchValue({
            c5: this.currentUser.idUser
          });
        },
        error: (err) => {
          console.error('Error fetching user data', err);
        }
      });
    }
  }

  loadComments(): void {
    this.cS.list().subscribe((data) => {
      this.dataSource = data;
    });
    this.cS.getList().subscribe((data) => {
      this.dataSource = data;
    });
  }

  eliminar(id: number): void {
    this.cS.eliminar(id).subscribe(() => {
      this.loadComments();
    });
  }

  registrar(): void {
    if (this.form.valid) {
      this.s.idComment = this.form.value.c1;
      this.s.textComment = this.form.value.c2;
      this.s.dateComment = new Date();
      this.s.qualification = this.form.value.c4;
      this.s.user.idUser = this.currentUser.idUser;
      this.s.spRecipe.idSpecialRecipe = this.form.value.c6;

      this.cS.insert(this.s).subscribe(() => {
        this.loadComments();
      });

      this.router.navigate(['comment']);
    }
  }
}
