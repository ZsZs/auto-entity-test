import { Component, OnInit } from '@angular/core';
import { TestEntityFacade } from './auto-entity/test-entity-facade';
import { Observable } from 'rxjs';
import { TestEntity } from './auto-entity/test-entity';

@Component({
  selector: 'auto-entity-test-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  entities$!: Observable<TestEntity[]>;
  title = 'auto-entity-test';

  constructor( private facade: TestEntityFacade ) {}

  ngOnInit(): void {
    this.entities$ = this.facade.all$;
    this.facade.loadAll();
  }
}
