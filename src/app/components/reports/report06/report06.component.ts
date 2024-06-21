import { Component, OnInit } from '@angular/core';
import { OptionPayService } from '../../../services/optionpay.service';
import { OptionPay } from '../../../models/OptionPay';
import { NgFor } from '@angular/common';


@Component({
  selector: 'app-report06',
  standalone: true,
  imports: [NgFor],
  templateUrl: './report06.component.html',
  styleUrls: ['./report06.component.css']
})
export class Report06Component implements OnInit {
  optionPays: OptionPay[] = [];

  constructor(private optionPayService: OptionPayService) {}

  ngOnInit(): void {
    this.optionPayService.getlistByCard().subscribe(
      (data: OptionPay[]) => {
        this.optionPays = data;
      },
      (error) => {
        console.error('Error fetching option pays', error);
      }
    );
  }
}

