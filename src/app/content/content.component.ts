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
  private cocktails: CocktailList[];
  cocktailsSub: Subscription;

  private currentCategoryIndex: number;
  currentCategoryList: CocktailList[];

  constructor(private cocktailService: CocktailService) {}

  ngOnInit(): void {
    this.cocktailsSub = this.cocktailService
      .getSelectedCocktails()
      .subscribe((result) => {
        this.cocktails = result;
        this.initListView();
      });
  }

  ngOnDestroy(): void {
    this.cocktailsSub.unsubscribe();
  }

  onScroll($event) {
    if ($event.isReachingBottom) {
      this.getNextCategory();
    } else if ($event.isReachingTop) {
      this.clearPrevCategory();
    }
    return;
  }

  getNextCategory() {
    if (
      this.currentCategoryIndex < this.cocktails.length - 1 &&
      this.cocktails.length > 1
    ) {
      this.currentCategoryIndex++;
      this.currentCategoryList.push(this.cocktails[this.currentCategoryIndex]);
    }
  }

  clearPrevCategory() {
    if (this.currentCategoryIndex > 0) {
      this.currentCategoryIndex--;
      this.currentCategoryList.pop();
    }
  }

  initListView() {
    this.currentCategoryIndex = 0;
    this.currentCategoryList = [this.cocktails[this.currentCategoryIndex]];
    window.scrollTo(0, 0);
  }
}
