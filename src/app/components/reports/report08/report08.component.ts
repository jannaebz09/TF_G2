import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { ProductService } from '../../../services/product.service';

@Component({
  selector: 'app-report08',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, ReactiveFormsModule],
  templateUrl: './report08.component.html',
  styleUrls: ['./report08.component.css']
})
export class Report08Component implements OnInit {
  priceForm: FormGroup;
  barChartOptions: ChartOptions = {
    responsive: true,
    indexAxis: 'x',
    scales: {
      y: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        }
      },
      x: {
        beginAtZero: true,
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private sS: ProductService, private fb: FormBuilder) {
    this.priceForm = this.fb.group({
      Precio_min: [''],
      Precio_max: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { Precio_min, Precio_max } = this.priceForm.value;

    this.sS.productByPrice(Precio_min, Precio_max).subscribe((data) => {
      this.barChartLabels = data.map((item) => item.nameProduct);

      this.barChartData = [
        {
          data: data.map((item) => item.amountProduct),
          label: 'Precio del Producto',
          backgroundColor: [
            '#0094d3',
            '#4169c7',
            '#0000CD',
            '#9BBB59',
            '#8064A2',
            '#4BACC6',
            '#4F81BC',
            '#C0504D',
          ],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}