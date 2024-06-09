import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { OptionPay } from '../../../models/OptionPay';
import { OptionPayService } from '../../../services/optionpay.service';
import { Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CommonModule } from '@angular/common';
import { MatSelectModule } from '@angular/material/select';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-creaeditaoptionpay',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule,MatInputModule,CommonModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,MatButtonModule],
  templateUrl: './creaeditaoptionpay.component.html',
  styleUrl: './creaeditaoptionpay.component.css'
})
export class CreaeditaoptionpayComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  o: OptionPay = new OptionPay();

  constructor(
    private formBuilder: FormBuilder,
    private oS: OptionPayService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      tipo: ['', Validators.required],
      descripcion: ['', Validators.required],
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.o.typeOptionPay = this.form.value.tipo;
      this.o.descriptionOptionPay = this.form.value.descripcion;
      this.oS.insert(this.o).subscribe((data) => {
        this.oS.list().subscribe((data) => {
          this.oS.setList(data);
        });
      });
      this.router.navigate(['optionpay']);
    }
  }
}
