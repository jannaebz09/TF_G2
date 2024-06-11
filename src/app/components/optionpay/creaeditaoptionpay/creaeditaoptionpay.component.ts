import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
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
  edicion: boolean = false;
  id: number = 0;

  constructor(
    private formBuilder: FormBuilder,
    private oS: OptionPayService,
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
    });
  }
  registrar(): void {
    if (this.form.valid) {
      this.o.idOptionPay=this.form.value.c1;
      this.o.typeOptionPay = this.form.value.c2;
      this.o.descriptionOptionPay = this.form.value.c3;
      this.oS.insert(this.o).subscribe((data) => {
        this.oS.list().subscribe((data) => {
          this.oS.setList(data);
        });
      });
      this.router.navigate(['optionpay']);
    }
  }
  init() {
    if (this.edicion) {
      this.oS.listId(this.id).subscribe((data) => {
        this.form = new FormGroup({
          c1: new FormControl(data.idOptionPay),
          c2: new FormControl(data.typeOptionPay),
          c3: new FormControl(data.descriptionOptionPay),
         
        });
      });
    }
  }
}
