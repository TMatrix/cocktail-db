import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit {
  categories: String[];
  constructor() {}

  ngOnInit(): void {
    this.categories = ['Ordinary Drink', 'Cocktail', 'Milk / Float / Shake'];
  }
}

//app-checkbox - add @Input(category), @Output(
