import { WaterType } from '../../domain/model/water-monitoring-station.entity';
import { BaseResource } from '../../../shared/infrastructure/base-response';

/**
 * Represents a monitoring station resource returned by the REST API.
 *
 * @author u20241d945
 */
export interface WaterMonitoringStationResource extends BaseResource {
  id: number;
  name: string;
  waterType: WaterType;
}
