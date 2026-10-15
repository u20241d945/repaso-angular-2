import { BaseResponse } from '../../../shared/infrastructure/base-response';
import { WaterMonitoringStationResource } from '../resources/water-monitoring-station.resource';

/**
 * Response envelope supported by the monitoring stations endpoint.
 *
 * @author u20241d945
 */
export interface WaterMonitoringStationsResponse extends BaseResponse {
  waterMonitoringStations: WaterMonitoringStationResource[];
}
