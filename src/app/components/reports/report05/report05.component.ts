import { Component, OnInit } from '@angular/core';
import { CommentService } from '../../../services/comment.service';
import { NgFor } from '@angular/common';
import { Comment } from '../../../models/Comment';


@Component({
  selector: 'app-report05',
  standalone: true,
  imports: [NgFor],
  templateUrl: './report05.component.html',
  styleUrls: ['./report05.component.css']
})
export class Report05Component implements OnInit {
  comments: Comment[] = [];

  constructor(private commentService: CommentService) {}

  ngOnInit(): void {
    this.commentService.getCommentsGreaterThan3().subscribe(
      (data) => {
        this.comments = data;
      },
      (error) => {
        console.error('Error fetching comments', error);
      }
    );
  }
}

