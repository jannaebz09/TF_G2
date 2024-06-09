import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarsaleComponent } from './listarsale/listarsale.component';

@Component({
  selector: 'app-sale',
  standalone: true,
  imports: [RouterOutlet,ListarsaleComponent],
  templateUrl: './sale.component.html',
  styleUrl: './sale.component.css'
})
export class SaleComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
