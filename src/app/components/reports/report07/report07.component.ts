import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SaleService } from '../../../services/sale.service';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-report07',
  standalone: true,
  imports: [BaseChartDirective, CommonModule, ReactiveFormsModule],
  templateUrl: './report07.component.html',
  styleUrls: ['./report07.component.css']
})
export class Report07Component implements OnInit {
  dateForm: FormGroup;
  barChartOptions: ChartOptions = {
    responsive: true,
    indexAxis: 'y',
    scales: {
      x: {
        beginAtZero: true,
        ticks: {
          stepSize: 1,
        }
      },
      y: {
        beginAtZero: true,
      }
    }
  };
  barChartLabels: String[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private sS: SaleService, private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      Dia_inicial: [''],
      Dia_final: ['']
    });
  }

  ngOnInit(): void {}

  onSubmit(): void {
    const { Dia_inicial, Dia_final } = this.dateForm.value;

    this.sS.TopUsersWithMostSales(Dia_inicial, Dia_final).subscribe((data) => {
      this.barChartLabels = data.map((item) => item.fullname);

      this.barChartData = [
        {
          data: data.map((item) => item.quantity),
          label: 'Ventas Realizadas',
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