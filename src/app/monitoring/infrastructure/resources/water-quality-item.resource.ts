import { WaterType } from '../../domain/model/water-monitoring-station.entity';
import { BaseResource } from '../../../shared/infrastructure/base-response';

/**
 * Represents a water quality resource returned by the REST API.
 *
 * @author u20241d945
 */
export interface WaterQualityItemResource extends BaseResource {
  id: number;
  stationId: number;
  waterType: WaterType;
  regionCode: string;
  regionName: string;
  consumptionLevel: number;
  qualityIndex: number;
  year: number;
  registeredAt: string;
}
