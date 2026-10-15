import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BaseApiEndpoint } from '../../../shared/infrastructure/base-api-endpoint';
import { WaterMonitoringStation } from '../../domain/model/water-monitoring-station.entity';
import { WaterMonitoringStationAssembler } from '../assemblers/water-monitoring-station.assembler';
import { WaterMonitoringStationResource } from '../resources/water-monitoring-station.resource';
import { WaterMonitoringStationsResponse } from '../responses/water-monitoring-stations.response';

/**
 * Endpoint client for water monitoring station operations.
 *
 * @author u20241d945
 */
export class WaterMonitoringStationsApiEndpoint extends BaseApiEndpoint<
  WaterMonitoringStation,
  WaterMonitoringStationResource,
  WaterMonitoringStationsResponse,
  WaterMonitoringStationAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.monitoringApiBaseUrl}${environment.monitoringStationsEndpointPath}`,
      new WaterMonitoringStationAssembler()
    );
  }
}
