import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListardetailsaleComponent } from './listardetailsale/listardetailsale.component';

@Component({
  selector: 'app-detailsale',
  standalone: true,
  imports: [RouterOutlet,ListardetailsaleComponent],
  templateUrl: './detailsale.component.html',
  styleUrl: './detailsale.component.css'
})
export class DetailsaleComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
