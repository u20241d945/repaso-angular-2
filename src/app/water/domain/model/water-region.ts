import { WaterType } from '../../../monitoring/domain/model/water-monitoring-station.entity';

/**
 * Maps each water type to its logical international water region.
 *
 * @author u20241d945
 */
export const WATER_REGION_BY_TYPE: Readonly<Record<WaterType, string>> = {
  river: 'South America',
  lake: 'North America',
  groundwater: 'Middle East',
  rainwater: 'Asia',
  glacier: 'Europe',
  desalination: 'Africa'
};
