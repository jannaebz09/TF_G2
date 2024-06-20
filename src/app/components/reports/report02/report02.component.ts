import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';

import { CommonModule } from '@angular/common';
import { SaleService } from '../../../services/sale.service';

@Component({
  selector: 'app-report02',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './report02.component.html',
  styleUrls: ['./report02.component.css']
})
export class Report02Component implements OnInit {
  totalSales: number | null = null;
  dateForm: FormGroup;

  constructor(private saleService: SaleService, private fb: FormBuilder) {
    this.dateForm = this.fb.group({
      startDate: [''],
      endDate: ['']
    });
  }

  ngOnInit(): void {}

  getTotalSales(): void {
    const { startDate, endDate } = this.dateForm.value;
    if (startDate && endDate) {
      this.saleService.getTotalSalebyDate(startDate, endDate).subscribe(
        (total) => {
          this.totalSales = total;
        },
        (error) => {
          console.error('Error fetching total sales', error);
        }
      );
    }
  }
}
