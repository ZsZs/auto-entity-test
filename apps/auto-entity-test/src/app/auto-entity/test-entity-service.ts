import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { IAutoEntityService, IEntityInfo } from '@briebug/ngrx-auto-entity';
import { TestEntity } from './test-entity';
import { map, Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({ providedIn: 'root' })
export class TestEntityService implements IAutoEntityService<TestEntity>{

  constructor( private http: HttpClient ) {}

  load(entityInfo: IEntityInfo, id: number): Observable<TestEntity> {
    return this.http.get<TestEntity>(
      `${environment.rootUrl}/${entityInfo.modelName}/${id}`
    );
  }

  loadAll(entityInfo: IEntityInfo): Observable<TestEntity[]> {
    return this.http.get<TestEntity[]>(
      `${environment.rootUrl}/${entityInfo.modelName}`
    );
  }

  create(entityInfo: IEntityInfo, entity: TestEntity): Observable<TestEntity> {
    return this.http.post<TestEntity>(
      `${environment.rootUrl}/${entityInfo.modelName}`,
      entity
    );
  }

  update(entityInfo: IEntityInfo, entity: TestEntity): Observable<TestEntity> {
    return this.http.patch<TestEntity>(
      `${environment.rootUrl}/${entityInfo.modelName}/${entity.id}`,
      entity
    );
  }

  delete(entityInfo: IEntityInfo, entity: TestEntity): Observable<TestEntity> {
    return this.http.delete<TestEntity>(
      `${environment.rootUrl}/${entityInfo.modelName}/${entity.id}`
    ).pipe(map(() => entity));
  }
}
