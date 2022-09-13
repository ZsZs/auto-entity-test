import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { NxWelcomeComponent } from './nx-welcome.component';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { TestEntity } from './auto-entity/test-entity';
import { TestEntityService } from './auto-entity/test-entity-service';
import { appReducer } from './app.state';
import { HttpClientModule } from '@angular/common/http';
import { ENVIRONMENT } from '@myorg/test-auto-entity';
import { environment } from '../environments/environment';
import { RouterModule, Routes } from '@angular/router';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';

const appRoutes: Routes = [
  { path: 'testEntities', loadChildren: () => import('@myorg/test-auto-entity').then( module => module.SharedAutoEntityModule)},
];

@NgModule({
  declarations: [AppComponent, NxWelcomeComponent],
  imports: [
    BrowserModule,
    EffectsModule.forRoot([]),
    HttpClientModule,
    NgrxAutoEntityModule.forRoot(),
    RouterModule.forRoot( appRoutes ),
    StoreModule.forRoot(appReducer),
    !environment.production ? StoreDevtoolsModule.instrument() : [],
  ],
  providers: [
    { provide: TestEntity, useClass: TestEntityService },
    { provide: ENVIRONMENT, useValue: environment }
  ],
  bootstrap: [AppComponent],
})
export class AppModule {}
