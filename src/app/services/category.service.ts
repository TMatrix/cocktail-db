import { Injectable } from '@angular/core';
import { baseUrl } from '../shared/baseUrl';
import { HttpClient } from '@angular/common/http';
import { Observable, BehaviorSubject } from 'rxjs';
import { map, tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class CategoryService {
  categoriesUrl = baseUrl + 'list.php?c=list';

  private selectedCategories: BehaviorSubject<String[]> = new BehaviorSubject(
    []
  );
  currentlySelected = this.selectedCategories.asObservable();

  constructor(private http: HttpClient) {}

  getCategories(): Observable<String[]> {
    return this.http.get(this.categoriesUrl).pipe(
      map((res) => res['drinks'].map((c) => c['strCategory'])),
      tap((data) => this.selectedCategories.next(data))
    );
  }

  selectCategories(categories: String[]) {
    this.selectedCategories.next(categories);
  }
}
