import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.scss']
})
export class RatingComponent implements OnInit {

  @Input() score!: number;

  constructor() { }

  ngOnInit(): void {
    this.score = Math.round(this.score / 10);
  }
}
