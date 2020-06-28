import { Injectable } from '@angular/core';
import { baseUrl } from '../shared/baseUrl';
import { CategoryService } from './category.service';
import { HttpClient } from '@angular/common/http';
import { map, mergeMap } from 'rxjs/operators';
import { Observable, forkJoin } from 'rxjs';
import { Drink } from '../models/drink.model';
import { CocktailList } from '../models/cocktailsList.model';

@Injectable({
  providedIn: 'root',
})
export class CocktailService {
  cocktailsUrl = baseUrl + 'filter.php?c=';

  constructor(
    private http: HttpClient,
    private categoryService: CategoryService
  ) {}

  private getCocktailsByCategory(category): Observable<Drink[]> {
    return this.http.get(`${this.cocktailsUrl}${category}`).pipe(
      map((res) => {
        if (!res) {
          return [];
        }
        return res['drinks'].map((c) =>
          Object.assign(
            {},
            { name: c['strDrink'], thumbnail: c['strDrinkThumb'] }
          )
        );
      })
    );
  }

  getSelectedCocktails(): Observable<CocktailList[]> {
    return this.categoryService.currentlySelected.pipe(
      mergeMap((categories) => {
        return forkJoin(
          ...categories.map((c) => this.getCocktailsByCategory(c))
        ).pipe(
          map((cocktails) =>
            cocktails.map((c, i) =>
              Object.assign({}, { category: categories[i], drinks: c })
            )
          )
        );
      })
    );
  }
}
