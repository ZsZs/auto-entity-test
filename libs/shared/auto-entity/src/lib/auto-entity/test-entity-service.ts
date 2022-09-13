import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { TestEntity } from './test-entity';
import { map, Observable } from 'rxjs';
import { Environment } from '../environment.interface';
import { ENVIRONMENT } from '../environment.token';

@Injectable({ providedIn: 'root' })
export class TestEntityService implements IAutoEntityService<TestEntity>{

  constructor( private http: HttpClient, @Inject( ENVIRONMENT ) private environment: Environment ) {}

  load(entityInfo: IEntityInfo, id: number): Observable<TestEntity> {
    return this.http.get<TestEntity>(
      `${this.environment.rootUrl}/${entityInfo.modelName}/${id}`
    );
  }

  loadAll(entityInfo: IEntityInfo): Observable<TestEntity[]> {
    return this.http.get<TestEntity[]>(
      `${this.environment.rootUrl}/${entityInfo.modelName}`
    );
  }

  create(entityInfo: IEntityInfo, entity: TestEntity): Observable<TestEntity> {
    return this.http.post<TestEntity>(
      `${this.environment.rootUrl}/${entityInfo.modelName}`,
      entity
    );
  }

  update(entityInfo: IEntityInfo, entity: TestEntity): Observable<TestEntity> {
    return this.http.patch<TestEntity>(
      `${this.environment.rootUrl}/${entityInfo.modelName}/${entity.id}`,
      entity
    );
  }

  delete(entityInfo: IEntityInfo, entity: TestEntity): Observable<TestEntity> {
    return this.http.delete<TestEntity>(
      `${this.environment.rootUrl}/${entityInfo.modelName}/${entity.id}`
    ).pipe(map(() => entity));
  }
}
