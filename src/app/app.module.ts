import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';

import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { FilterComponent } from './filter/filter.component';
import { CategoryService } from './services/category.service';

@NgModule({
  declarations: [AppComponent, HeaderComponent, FilterComponent],
  imports: [BrowserModule, HttpClientModule, ReactiveFormsModule],
  providers: [CategoryService],
  bootstrap: [AppComponent],
})
export class AppModule {}
