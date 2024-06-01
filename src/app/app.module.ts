import { NgModule } from '@angular/core';
import {
  BrowserModule,
  provideClientHydration,
} from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { ResultServices } from './result.service';
import { ResultService } from './Services';
import { Expression } from './Expression';
import { DataMem } from './DataMem';

@NgModule({
  declarations: [AppComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule, HttpClientModule],
  providers: [provideClientHydration(), ResultService, Expression, DataMem],
  bootstrap: [AppComponent],
})
export class AppModule {}
