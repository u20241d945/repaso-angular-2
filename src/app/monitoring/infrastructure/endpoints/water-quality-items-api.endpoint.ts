import { HttpClient } from '@angular/common/http';
import { Observable, catchError, map } from 'rxjs';
import { environment } from '../../../../environments/environment';
import { BaseApiEndpoint } from '../../../shared/infrastructure/base-api-endpoint';
import { WaterType } from '../../domain/model/water-monitoring-station.entity';
import { WaterQualityItem } from '../../domain/model/water-quality-item.entity';
import { WaterQualityItemAssembler } from '../assemblers/water-quality-item.assembler';
import { CreateWaterQualityItemRequest } from '../requests/create-water-quality-item.request';
import { WaterQualityItemResource } from '../resources/water-quality-item.resource';
import { WaterQualityItemsResponse } from '../responses/water-quality-items.response';

/**
 * Endpoint client for water quality record operations.
 *
 * @author u20241d945
 */
export class WaterQualityItemsApiEndpoint extends BaseApiEndpoint<
  WaterQualityItem,
  WaterQualityItemResource,
  WaterQualityItemsResponse,
  WaterQualityItemAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.monitoringApiBaseUrl}${environment.waterQualityItemsEndpointPath}`,
      new WaterQualityItemAssembler()
    );
  }

  /** Retrieves the latest indicators registered for a water type. */
  getLatestByWaterType(waterType: WaterType): Observable<WaterQualityItem | null> {
    const query = `?waterType=${encodeURIComponent(waterType)}&_sort=year&_order=desc&_limit=1`;
    return this.http.get<WaterQualityItemResource[]>(`${this.endpointUrl}${query}`).pipe(
      map(resources => resources[0]
        ? this.assembler.toEntityFromResource(resources[0])
        : null),
      catchError(this.handleError('Failed to fetch water quality indicators'))
    );
  }

  /** Creates a record from the command payload used by the form. */
  createFromRequest(request: CreateWaterQualityItemRequest): Observable<WaterQualityItem> {
    return this.http.post<WaterQualityItemResource>(this.endpointUrl, request).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to create water quality item'))
    );
  }
}
