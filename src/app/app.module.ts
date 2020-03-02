import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { MinionDisplayComponent } from './components/minion-display/minion-display.component';
import { HttpClientModule } from '@angular/common/http';
import { CustomizerComponent } from './components/customizer/customizer.component';
import { WallComponent } from './components/wall/wall.component';
import { FaIconLibrary, FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faListAlt } from '@fortawesome/free-regular-svg-icons';
import { SingleMinonCustomizeComponent } from './components/single-minon-customize/single-minon-customize.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatFormFieldModule } from '@angular/material/form-field';
import { FormsModule } from '@angular/forms';
import { MatSliderModule } from '@angular/material/slider';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { MatButtonModule } from '@angular/material/button';
import { LoadingIndicatorComponent } from './components/loading-indicator/loading-indicator.component';

@NgModule({
  declarations: [
    AppComponent, //
    MinionDisplayComponent,
    CustomizerComponent,
    WallComponent,
    SingleMinonCustomizeComponent,
    LoadingIndicatorComponent
  ],
  imports: [
    BrowserModule, //
    BrowserAnimationsModule,
    MatSliderModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    MatButtonToggleModule,
    MatCheckboxModule,
    MatIconModule,
    MatMenuModule,
    MatButtonModule,
    AppRoutingModule,
    MatFormFieldModule
  ],
  providers: [],
  bootstrap: [
    AppComponent //
  ]
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faListAlt);
  }
}
