import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AuthInterceptorService } from './auth/auth-intercerptor.service';
import { ErrorInterceptor } from './error.interceptor';
import { ReactiveFormsModule } from '@angular/forms';

import {NgbModule} from '@ng-bootstrap/ng-bootstrap';
import { MaterialModule } from './material.module';
import { RoutineGeneratorComponent } from './routine-generator/routine-generator.component';
import {NgxMaterialTimepickerModule} from 'ngx-material-timepicker';
import { ReactiveFormsModule } from '@angular/forms';
import { RoutineListComponent } from './routine-generator/routine-list/routine-list.component';
import { ExportAsModule } from 'ngx-export-as';
import { RoutineEditComponent } from './routine-generator/routine-edit/routine-edit.component';


@NgModule({
  declarations: [
    AppComponent,
    RoutineGeneratorComponent,
    RoutineListComponent,
    RoutineEditComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    NgbModule,
    BrowserAnimationsModule,
    MaterialModule,
    NgxMaterialTimepickerModule,
    ReactiveFormsModule,
    HttpClientModule,
    ReactiveFormsModule
    ExportAsModule
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorInterceptor,
      multi: true
    },
  ],
  entryComponents:[RoutineEditComponent],
  bootstrap: [AppComponent]
})
export class AppModule { }
