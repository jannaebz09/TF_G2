import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { SpRecipeService } from '../../../services/sp-recipe.service';
import { BaseChartDirective } from 'ng2-charts';
import { ExpcertificateService } from '../../../services/expcertificate.service';

@Component({
  selector: 'app-report09',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report09.component.html',
  styleUrl: './report09.component.css'
})
export class Report09Component implements OnInit {
  barChartOptions: ChartOptions = {
    responsive: true,
    indexAxis: 'y',
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
  barChartLabels: String[] = [];
  barChartType: ChartType = 'bar';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private sS: ExpcertificateService) {}

  ngOnInit(): void {
    this.sS.QuantityUserByInstitutionName().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.intitutionName);

      this.barChartData = [
        {
          data: data.map((item) => item.quantity),
          label: 'Cantidad de usuarios por institución',
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