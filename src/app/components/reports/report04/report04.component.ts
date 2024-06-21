import { SaleByUserDTO } from './../../../models/SaleByUserDTO';
import { Component } from '@angular/core';
import { ChartDataset, ChartOptions, ChartType } from 'chart.js';
import { BaseChartDirective } from 'ng2-charts';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-report04',
  standalone: true,
  imports: [BaseChartDirective],
  templateUrl: './report04.component.html',
  styleUrl: './report04.component.css'
})
export class Report04Component {
  barChartOptions: ChartOptions = {
    responsive: true,
  };
  barChartLabels: String[] = [];
  barChartType: ChartType = 'pie';
  barChartLegend = true;
  barChartData: ChartDataset[] = [];

  constructor(private sS: SaleService) {}
  ngOnInit(): void {
    this.sS.saleByUser().subscribe((data) => {
      this.barChartLabels = data.map((item) => item.fullName);
      this.barChartData = [
        {
          data: data.map((item) => item.quantitySale),
          label: 'Cantidad de ventas',
          backgroundColor: ['#8064A2', '#4BACC6', '#4F81BC', '#C0504D'],
          borderColor: 'rgba(173, 216, 230, 1)',
          borderWidth: 1,
        },
      ];
    });
  }
}
