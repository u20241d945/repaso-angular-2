import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { BaseApi } from '../../../shared/infrastructure/base-api';
import { WaterMonitoringStation, WaterType } from '../../domain/model/water-monitoring-station.entity';
import { WaterQualityItem } from '../../domain/model/water-quality-item.entity';
import { WaterMonitoringStationsApiEndpoint } from '../endpoints/water-monitoring-stations-api.endpoint';
import { WaterQualityItemsApiEndpoint } from '../endpoints/water-quality-items-api.endpoint';
import { CreateWaterQualityItemRequest } from '../requests/create-water-quality-item.request';

/**
 * Provides access to monitoring stations and water quality records.
 *
 * @author u20241d945
 */
@Injectable({ providedIn: 'root' })
export class MonitoringApiService extends BaseApi {
  private readonly http = inject(HttpClient);
  private readonly stationsEndpoint = new WaterMonitoringStationsApiEndpoint(this.http);
  private readonly itemsEndpoint = new WaterQualityItemsApiEndpoint(this.http);

  /** Retrieves every registered water quality item. */
  getItems(): Observable<WaterQualityItem[]> {
    return this.itemsEndpoint.getAll();
  }

  /** Retrieves all available monitoring stations. */
  getStations(): Observable<WaterMonitoringStation[]> {
    return this.stationsEndpoint.getAll();
  }

  /** Retrieves the latest automatic indicators for the selected water type. */
  getLatestIndicators(waterType: WaterType): Observable<WaterQualityItem | null> {
    return this.itemsEndpoint.getLatestByWaterType(waterType);
  }

  /** Creates a new water quality item. */
  createItem(request: CreateWaterQualityItemRequest): Observable<WaterQualityItem> {
    return this.itemsEndpoint.createFromRequest(request);
  }
}
