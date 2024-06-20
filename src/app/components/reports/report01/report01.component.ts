import { Component, OnInit } from '@angular/core';
import { ProductService } from '../../../services/product.service';
import { NgIf } from '@angular/common';


@Component({
  selector: 'app-report01',
  standalone: true,
  imports: [NgIf],
  templateUrl: './report01.component.html',
  styleUrls: ['./report01.component.css']
})
export class Report01Component implements OnInit {
  totalQuantity: number | null = null;

  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.productService.getQuantitytotal().subscribe(
      (quantity) => {
        this.totalQuantity = quantity;
      },
      (error) => {
        console.error('Error fetching total quantity', error);
      }
    );
  }
}
