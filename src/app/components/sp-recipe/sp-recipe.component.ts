import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarspRecipeComponent } from './listarsp-recipe/listarsp-recipe.component';

@Component({
  selector: 'app-sp-recipe',
  standalone: true,
  imports: [RouterOutlet, ListarspRecipeComponent],
  templateUrl: './sp-recipe.component.html',
  styleUrl: './sp-recipe.component.css'
})
export class SpRecipeComponent implements OnInit {
  constructor(public route: ActivatedRoute) { }
  ngOnInit(): void {
  }
}
