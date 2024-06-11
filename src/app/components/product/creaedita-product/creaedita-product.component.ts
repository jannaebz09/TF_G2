import { Component, OnInit } from '@angular/core';
import {
  FormGroup,
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormControl,
} from '@angular/forms';
import { OptionPay } from '../../../models/OptionPay';
import { OptionPayService } from '../../../services/optionpay.service';
import { ActivatedRoute, Params, Router } from '@angular/router';
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
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    CommonModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatButtonModule,
  ],
  templateUrl: './creaedita-product.component.html',
  styleUrl: './creaedita-product.component.css',
})
export class CreaeditaProductComponent implements OnInit {
  form: FormGroup = new FormGroup({});
  p: Product = new Product();
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private pS: ProductService,
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
      c1:[''],
      c2: ['', Validators.required],
    c3: ['', Validators.required],
      c4: ['', Validators.required],
      c5: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
      c6: ['', [Validators.required, Validators.pattern('^[0-9]*$')]],
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.p.idProduct=this.form.value.c1;
      this.p.nameProduct = this.form.value.c2;
      this.p.descriptionProduct = this.form.value.c3;
      this.p.preparationProduct = this.form.value.c4;
      this.p.amountProduct = this.form.value.c5;
      this.p.rucProduct = this.form.value.c6;
      this.pS.insert(this.p).subscribe((data) => {
        this.pS.list().subscribe((data) => {
          this.pS.setList(data);
        });
      });
      this.router.navigate(['product']);
    }
  }
  init() {
    if (this.edicion) {
      this.pS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          c1: new FormControl(data.idProduct),
          c2: new FormControl(data.nameProduct),
          c3: new FormControl(data.descriptionProduct),
          c4: new FormControl(data.preparationProduct),
          c5: new FormControl(data.amountProduct),
          c6: new FormControl(data.rucProduct),
        

        });
      });
    }
  }
}
