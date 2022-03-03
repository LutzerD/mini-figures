import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './home/home.component';
import { MiniatureDisplayComponent } from './miniatures/miniature-display/miniature-display.component';
import { MiniatureShowcaseComponent } from './miniatures/miniature-showcase/miniature-showcase.component';

@NgModule({
  declarations: [
    AppComponent,
    MiniatureDisplayComponent,
    HomeComponent,
    MiniatureShowcaseComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
