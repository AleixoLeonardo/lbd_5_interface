import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';
import { ToastrModule } from 'ngx-toastr';
import { environment } from 'src/environments/environment';

import { AppRoutingModule } from './app-routing.module';
import { metaReducers, reducers } from './app-state';
import { AppComponent } from './app.component';
import { HistoryTaskComponent } from './components/history-task/history-task.component';
import { HomeComponent } from './components/home/home.component';
import { JobComponent } from './components/job/job.component';
import { LoginComponent } from './components/login/login.component';
import { TaskComponent } from './components/task/task.component';
import { UserComponent } from './components/user/user.component';
import { AuthEffects } from './shared/effects/auth.effects';
import { HistoryTaskEffects } from './shared/effects/history-task.effects';
import { JobEffects } from './shared/effects/job.effects';
import { TaskEffects } from './shared/effects/task.effects';
import { UserEffects } from './shared/effects/user.effects';


@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    HomeComponent,
    UserComponent,
    JobComponent,
    TaskComponent,
    HistoryTaskComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    EffectsModule.forRoot([AuthEffects, UserEffects, JobEffects, TaskEffects, HistoryTaskEffects]),
    StoreModule.forRoot(reducers, {
      metaReducers
    }),
    ToastrModule.forRoot(),
    BrowserAnimationsModule,
    StoreDevtoolsModule.instrument({
      maxAge: 25, // Retains last 25 states
      logOnly: environment.production, // Restrict extension to log-only mode
      autoPause: true, // Pauses recording actions and state changes when the extension window is not open
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
