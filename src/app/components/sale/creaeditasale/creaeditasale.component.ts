import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Router, RouterLink } from '@angular/router';
import { Sale } from '../../../models/Sale';
import { User } from '../../../models/User';
import { OptionPay } from '../../../models/OptionPay';
import { SaleService } from '../../../services/sale.service';
import { UserService } from '../../../services/user.service';
import { OptionPayService } from '../../../services/optionpay.service';
import moment from 'moment';
import { MatDatepickerModule } from '@angular/material/datepicker';

@Component({
  selector: 'app-creaeditasale',
  standalone: true,
  imports: [MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule],
  templateUrl: './creaeditasale.component.html',
  styleUrl: './creaeditasale.component.css'
})
export class CreaeditasaleComponent {
  form: FormGroup = new FormGroup({});
  s: Sale = new Sale();
  maxFecha: Date = moment().add(-1, 'days').toDate();
  listaUsuarios: User[] = [];
  listaOpcionPago: OptionPay[] = [];

  constructor(
    private formBuilder: FormBuilder,
    private sS: SaleService,
    private router: Router,
    private uS: UserService,
    private oS:OptionPayService
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      c1: ['', Validators.required],
      c2: ['', Validators.required],
      c3: ['', Validators.required],
    });
    this.uS.list().subscribe((data) => {
      this.listaUsuarios = data;
    });
    this.oS.list().subscribe((data) => {
      this.listaOpcionPago = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.s.user.idUser = this.form.value.c1;
      this.s.saleDate = this.form.value.c2;
      this.s.optionPay.idOptionPay = this.form.value.c3;
      this.sS.insert(this.s).subscribe((data) => {
        this.sS.list().subscribe((data) => {
          this.sS.setList(data);
        });
      });
      this.router.navigate(['sale']);
    }
  }
}
