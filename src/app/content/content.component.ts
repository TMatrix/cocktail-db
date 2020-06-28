import { Component, OnInit, OnDestroy } from '@angular/core';
import { CocktailService } from '../services/cocktail.service';
import { CocktailList } from '../models/cocktailsList.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnDestroy {
  cocktails: CocktailList[];
  cocktailsSub: Subscription;

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.cocktailsSub = this.cocktailService
      .getSelectedCocktails()
      .subscribe((result) => {
        this.cocktails = result;
      });
  }

  ngOnDestroy(): void {
    this.cocktailsSub.unsubscribe();
  }
}
