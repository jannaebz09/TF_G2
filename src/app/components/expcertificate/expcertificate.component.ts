import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarexpcertificateComponent } from './listarexpcertificate/listarexpcertificate.component';

@Component({
  selector: 'app-expcertificate',
  standalone: true,
  imports: [RouterOutlet,ListarexpcertificateComponent],
  templateUrl: './expcertificate.component.html',
  styleUrl: './expcertificate.component.css'
})
export class ExpcertificateComponent implements OnInit{
  constructor(public route: ActivatedRoute) {}
  ngOnInit(): void {}
}
