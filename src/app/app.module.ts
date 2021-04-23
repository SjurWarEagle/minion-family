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
import { SingleMinionCustomizeComponent } from './components/single-minon-customize/single-minion-customize.component';
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
import { PosterComponent } from './components/poster/poster.component';
import { MatInputModule, MatTextareaAutosize } from '@angular/material/input';
import { TextFieldModule } from '@angular/cdk/text-field';

@NgModule({
  declarations: [
    AppComponent, //
    MinionDisplayComponent,
    CustomizerComponent,
    WallComponent,
    PosterComponent,
    SingleMinionCustomizeComponent,
    LoadingIndicatorComponent,
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
    MatInputModule,
    MatButtonModule,
    AppRoutingModule,
    TextFieldModule,
    MatFormFieldModule,
  ],
  providers: [],
  bootstrap: [
    AppComponent, //
  ],
})
export class AppModule {
  constructor(private library: FaIconLibrary) {
    library.addIcons(faListAlt);
  }
}
