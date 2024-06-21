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
import { Sale } from '../../../models/Sale';
import { User } from '../../../models/User';
import { OptionPay } from '../../../models/OptionPay';
import { SaleService } from '../../../services/sale.service';
import { UserService } from '../../../services/user.service';
import { OptionPayService } from '../../../services/optionpay.service';
import moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-creaeditasale',
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
  templateUrl: './creaeditasale.component.html',
  styleUrl: './creaeditasale.component.css',
})
export class CreaeditasaleComponent {
  form: FormGroup = new FormGroup({});
  s: Sale = new Sale();
  listaUsuarios: User[] = [];
  listaOpcionPago: OptionPay[] = [];
  edicion: boolean = false;
  id: number = 0;
  currentUser:User=new User();

  constructor(
    private formBuilder: FormBuilder,
    private sS: SaleService,
    private router: Router,
    private uS: UserService,
    private oS: OptionPayService,
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
      c2: [{ value: '', disabled: true }, Validators.required],
      c3: [{ value: new Date(), disabled: true }, Validators.required],
      c4: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.oS.list().subscribe((data) => {
      this.listaOpcionPago = data;
    });
    const username = this.lS.showName();
    if (username) {
      this.uS.userlogin(username).subscribe({
        next: (user) => {
          this.currentUser = user; 
          this.form.patchValue({
            c2: this.currentUser.idUser
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
      this.s.idSale = this.form.value.c1;
      this.s.user.idUser = this.currentUser.idUser;
      this.s.saleDate = new Date();
      this.s.optionPay.idOptionPay = this.form.value.c4;
      this.sS.insert(this.s).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });
      this.router.navigate(['sale']);
    }
  }
  init() {
    if (this.edicion) {
      this.sS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          c1: new FormControl(data.idSale),
          c2: new FormControl({ value: this.currentUser.idUser, disabled: true }),
          c3: new FormControl({ value: new Date(), disabled: true }),
          c4: new FormControl(data.optionPay.idOptionPay),
        });
      });
    }
  }
}
