import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { ListarcommentComponent } from './listarcomment/listarcomment.component';

@Component({
  selector: 'app-comment',
  standalone: true,
  imports: [RouterOutlet, ListarcommentComponent],
  templateUrl: './comment.component.html',
  styleUrl: './comment.component.css'
})
export class CommentComponent implements OnInit {
  constructor(public route: ActivatedRoute) { }
  ngOnInit(): void {
  }
}
