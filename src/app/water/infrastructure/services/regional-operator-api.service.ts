import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BaseApi } from '../../../shared/infrastructure/base-api';
import { RegionalOperator } from '../../domain/model/regional-operator.entity';
import { DummyJsonEndpoint } from '../endpoints/dummy-json.endpoint';

/**
 * Retrieves regional operators from the DummyJSON API.
 *
 * @author u20241d945
 */
@Injectable({ providedIn: 'root' })
export class RegionalOperatorApiService extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly operatorsEndpoint = new DummyJsonEndpoint(this.http);

  /** Retrieves and maps all available regional operators. */
  getAll(): Observable<RegionalOperator[]> {
    return this.operatorsEndpoint.getAll();
  }
}
