import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { CocktailService } from '../services/cocktail.service';
import { CocktailList } from '../models/cocktailsList.model';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-content',
  templateUrl: './content.component.html',
  styleUrls: ['./content.component.scss'],
})
export class ContentComponent implements OnInit, OnDestroy {
  private cocktails: CocktailList[];
  cocktailsSub: Subscription;

  private currentCategoryIndex: number = 0;
  currentCategoryList: CocktailList[];

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.cocktailsSub = this.cocktailService
      .getSelectedCocktails()
      .subscribe((result) => {
        this.cocktails = result;
        this.currentCategoryList = [this.cocktails[this.currentCategoryIndex]];
      });
  }

  ngOnDestroy(): void {
    this.cocktailsSub.unsubscribe();
  }

  onScroll($event) {
    if ($event.isReachingBottom) {
      this.getNextCategory();
    } else if ($event.isReachingTop) {
      this.getPrevCategory();
    }
    return;
  }

  getNextCategory() {
    if (this.currentCategoryIndex < this.cocktails.length) {
      this.currentCategoryIndex++;
      this.currentCategoryList = this.currentCategoryList.concat(
        this.cocktails[this.currentCategoryIndex]
      );
    }
  }

  getPrevCategory() {
    if (this.currentCategoryIndex > 0) {
      this.currentCategoryIndex--;
      this.currentCategoryList.pop();
    }
  }
}
