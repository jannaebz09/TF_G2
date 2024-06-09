import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListaroptionpayComponent } from './listaroptionpay/listaroptionpay.component';

@Component({
  selector: 'app-optionpay',
  standalone: true,
  imports: [RouterOutlet,ListaroptionpayComponent],
  templateUrl: './optionpay.component.html',
  styleUrl: './optionpay.component.css'
})
export class OptionpayComponent implements OnInit {
  constructor(public route:ActivatedRoute) {}
  ngOnInit(): void {}
}
