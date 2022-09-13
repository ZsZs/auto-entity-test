import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { TestEntity } from './auto-entity/test-entity';
import { TestEntityService } from './auto-entity/test-entity-service';
import { StoreModule } from '@ngrx/store';
import { NgrxAutoEntityModule } from '@briebug/ngrx-auto-entity';
import { FEATURE_NAME, testFeatureReducer } from './auto-entity/test-entity-state';
import { SharedAutoEntityComponent } from './shared-auto-entity.component';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', component: SharedAutoEntityComponent }
];

@NgModule({
  imports: [
    CommonModule,
    HttpClientModule,
    NgrxAutoEntityModule.forFeature(),
    RouterModule.forChild( routes ),
    StoreModule.forFeature(FEATURE_NAME, testFeatureReducer),
  ],
  providers: [{ provide: TestEntity, useClass: TestEntityService }],
  declarations: [SharedAutoEntityComponent],
})
export class SharedAutoEntityModule {}
