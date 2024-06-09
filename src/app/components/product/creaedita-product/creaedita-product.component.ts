import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, ReactiveFormsModule } from '@angular/forms';
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
import { Product } from '../../../models/Product';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-creaedita-product',
  standalone: true,
  imports: [ReactiveFormsModule, MatFormFieldModule,MatInputModule,CommonModule,MatSelectModule,MatDatepickerModule,MatNativeDateModule,MatButtonModule],
  templateUrl: './creaedita-product.component.html',
  styleUrl: './creaedita-product.component.css'
})
export class CreaeditaProductComponent implements OnInit{
  form: FormGroup = new FormGroup({});
  p: Product = new Product();

  constructor(
    private formBuilder: FormBuilder,
    private pS: ProductService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.form = this.formBuilder.group({
      producto: ['', Validators.required],
      descripcion: ['', Validators.required],
      preparacion: ['', Validators.required],
      precio: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ],
      ],
      ruc: [
        '',
        [
          Validators.required,
          Validators.pattern('^[0-9]*$')
        ],
      ],
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.p.nameProduct = this.form.value.producto;
      this.p.descriptionProduct = this.form.value.descripcion;
      this.p.preparationProduct = this.form.value.preparacion;
      this.p.amountProduct = this.form.value.precio;
      this.p.rucProduct=this.form.value.ruc;
      this.pS.insert(this.p).subscribe((data) => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
        });
      });
      this.router.navigate(['product']);
    }
  }
}