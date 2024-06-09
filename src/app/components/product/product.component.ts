import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarProductComponent } from './listar-product/listar-product.component';

@Component({
  selector: 'app-product',
  standalone: true,
  imports: [RouterOutlet,ListarProductComponent],
  templateUrl: './product.component.html',
  styleUrl: './product.component.css'
})
export class ProductComponent implements OnInit{
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void {}
}
