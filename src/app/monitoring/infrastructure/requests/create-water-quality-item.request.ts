import { WaterType } from '../../domain/model/water-monitoring-station.entity';

/**
 * Describes the payload sent when a new water quality item is created.
 *
 * @author u20241d945
 */
export interface CreateWaterQualityItemRequest {
  stationId: number;
  waterType: WaterType;
  regionCode: string;
  regionName: string;
  consumptionLevel: number;
  qualityIndex: number;
  year: number;
  registeredAt: string;
}
