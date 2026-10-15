import { BaseResponse } from '../../../shared/infrastructure/base-response';
import { WaterQualityItemResource } from '../resources/water-quality-item.resource';

/**
 * Response envelope supported by the water quality endpoint.
 *
 * @author u20241d945
 */
export interface WaterQualityItemsResponse extends BaseResponse {
  waterQualityItems: WaterQualityItemResource[];
}
