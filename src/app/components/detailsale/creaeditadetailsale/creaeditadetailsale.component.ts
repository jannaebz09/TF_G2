import { CommonModule, NgIf } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatNativeDateModule } from '@angular/material/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ActivatedRoute, Params, Router, RouterLink } from '@angular/router';
import { DetailSale } from '../../../models/DetailSale';
import { Sale } from '../../../models/Sale';
import { Product } from '../../../models/Product';
import { DetailsaleService } from '../../../services/detailsale.service';
import { SaleService } from '../../../services/sale.service';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-creaeditadetailsale',
  standalone: true,
  imports: [MatButtonModule,
    MatSelectModule,
    MatFormFieldModule,
    CommonModule,
    MatNativeDateModule,
    RouterLink,
    ReactiveFormsModule,
    MatInputModule,
    NgIf,],
  templateUrl: './creaeditadetailsale.component.html',
  styleUrl: './creaeditadetailsale.component.css'
})
export class CreaeditadetailsaleComponent{
  form: FormGroup = new FormGroup({});
  d: DetailSale = new DetailSale();
  listaVentas: Sale[] = [];
  listaProductos: Product[] = [];
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private dS: DetailsaleService,
    private router: Router,
    private sS: SaleService,
    private pS:ProductService,
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
      c3: ['', [Validators.required,Validators.pattern('^[0-9]*$')]],
      c4: ['', Validators.required],
      c5: ['', Validators.required],
    });
    this.sS.list().subscribe((data) => {
      this.listaVentas = data;
    });
    this.pS.list().subscribe((data) => {
      this.listaProductos = data;
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.d.idDetailSale=this.form.value.c1;
      this.d.sale.idSale = this.form.value.c2;
      this.d.quantity = this.form.value.c3;
      this.d.product.idProduct = this.form.value.c4;
      this.d.descriptionDetailSale = this.form.value.c5;
      this.dS.insert(this.d).subscribe((data) => {
        this.dS.list().subscribe((data) => {
          this.dS.setList(data);
        });
      });
      this.router.navigate(['detailsale']);
    }
  }
  init() {
    if (this.edicion) {
      this.dS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          c1: new FormControl(data.idDetailSale),
          c2: new FormControl(data.sale.idSale),
          c3: new FormControl(data.quantity),
          c4: new FormControl(data.product.idProduct),
          c5: new FormControl(data.descriptionDetailSale),
        });
      });
    }
  }
}
