import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { SaleService } from '../../../services/sale.service';
import { BaseChartDirective } from 'ng2-charts';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { NgIf } from '@angular/common';

@Component({
  selector: 'app-report10',
  standalone: true,
  imports: [BaseChartDirective, ReactiveFormsModule, FormsModule,NgIf],
  templateUrl: './report10.component.html',
  styleUrls: ['./report10.component.css']
})
export class Report10Component implements OnInit {
  selectedDate: string = '';
  barChartOptions: ChartOptions = {
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        max: 5,
        ticks: {
          stepSize: 0.5,
        }
      },
      y: {
        beginAtZero: true,
      }
    }
  };
  barChartLabels: string[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private saleService: SaleService) {}

  ngOnInit(): void {}

  onSubmit(): void {
    if (this.selectedDate) {
      this.saleService.findSaleByDate(this.selectedDate).subscribe((data) => {
        this.barChartLabels = data.map((item) => item.idSale.toString());

        this.barChartData = [
          {
            data: data.map((item) => item.total),
            label: 'Ventas por Fecha',
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
}