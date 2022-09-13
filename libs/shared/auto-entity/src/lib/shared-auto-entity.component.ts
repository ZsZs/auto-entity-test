import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { TestEntityFacade } from './auto-entity/test-entity-facade';
import { Observable } from 'rxjs';
import { TestEntity } from './auto-entity/test-entity';

@Component({
  selector: 'test-auto-entity',
  template: `
    <ul>
      <li *ngFor="let entity of entities$ | async">{{entity.id}}: {{entity.dummyProperty}}</li>
    </ul>
 `,
  styles: [],
  encapsulation: ViewEncapsulation.Emulated,
})
export class SharedAutoEntityComponent implements OnInit {
  entities$: Observable<TestEntity[]> | undefined;

  constructor( private facade: TestEntityFacade ) {}

  ngOnInit(): void {
    this.entities$ = this.facade.all$;
    this.facade.loadAll();
  }
}
