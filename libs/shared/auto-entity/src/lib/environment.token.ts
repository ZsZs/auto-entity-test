import { InjectionToken } from '@angular/core';
import { Environment } from './environment.interface';

const defaultEnvironment: Environment = {production: false, rootUrl: 'http://localhost:3000'}

export const ENVIRONMENT: InjectionToken<Environment> = new InjectionToken<Environment>(
  'ENVIRONMENT',
  {providedIn: 'root', factory: () => defaultEnvironment }
);
