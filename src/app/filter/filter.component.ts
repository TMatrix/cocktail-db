import { Component, OnInit, OnDestroy } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Subscription } from 'rxjs';
import { FormGroup, FormBuilder, FormArray, FormControl } from '@angular/forms';

@Component({
  selector: 'app-filter',
  templateUrl: './filter.component.html',
  styleUrls: ['./filter.component.scss'],
})
export class FilterComponent implements OnInit, OnDestroy {
  categoriesData: String[];
  categoriesSub: Subscription;

  categoriesForm: FormGroup;

  loading: boolean = false;
  active: boolean = false;

  constructor(
    private categoryService: CategoryService,
    private formBuilder: FormBuilder
  ) {
    this.categoriesForm = this.formBuilder.group({
      categories: new FormArray([]),
    });
  }

  ngOnInit(): void {
    this.loading = true;
    this.categoriesSub = this.categoryService
      .getCategories()
      .subscribe((categoryList) => {
        this.categoriesData = categoryList;
        this.addCheckboxes();
        this.loading = false;
      });
  }

  ngOnDestroy() {
    this.categoriesSub.unsubscribe();
  }

  private addCheckboxes() {
    this.categoriesData.forEach(() => {
      const control = new FormControl(true);
      (this.categoriesForm.controls.categories as FormArray).push(control);
    });
  }

  onApply() {
    const selectedCategories: String[] = this.categoriesForm.value.categories
      .map((v, i) => (v ? this.categoriesData[i] : null))
      .filter((v) => v !== null);
    this.categoryService.selectCategories(selectedCategories);
  }

  toggleFilter() {
    this.active = !this.active;
  }
}
