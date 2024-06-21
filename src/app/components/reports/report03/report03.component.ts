import { Component, OnInit } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { SpRecipeService } from '../../../services/sp-recipe.service';
import { BaseChartDirective } from 'ng2-charts';

@Component({
  selector: 'app-report03',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report03.component.html',
  styleUrls: ['./report03.component.css'],
})
export class Report03Component implements OnInit {
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

  constructor(private sS: SpRecipeService) {}

  ngOnInit(): void {
    this.sS.orderbyqualification().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.description);

      this.barChartData = [
        {
          data: data.map((item) => item.average),
          label: 'Promedio de calificación',
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
