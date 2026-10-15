import { WaterQualityItem } from '../../domain/model/water-quality-item.entity';
import { BaseAssembler } from '../../../shared/infrastructure/base-assembler';
import { WaterQualityItemResource } from '../resources/water-quality-item.resource';
import { WaterQualityItemsResponse } from '../responses/water-quality-items.response';

/**
 * Converts water quality API resources into domain entities.
 *
 * @author u20241d945
 */
export class WaterQualityItemAssembler implements BaseAssembler<
  WaterQualityItem,
  WaterQualityItemResource,
  WaterQualityItemsResponse
> {
  /** Converts one API resource into a domain entity. */
  toEntityFromResource(resource: WaterQualityItemResource): WaterQualityItem {
    return new WaterQualityItem({
      id: resource.id,
      stationId: resource.stationId,
      waterType: resource.waterType,
      regionCode: resource.regionCode,
      regionName: resource.regionName,
      consumptionLevel: resource.consumptionLevel,
      qualityIndex: resource.qualityIndex,
      year: resource.year,
      registeredAt: resource.registeredAt
    });
  }

  /** Converts a domain entity into an API resource. */
  toResourceFromEntity(entity: WaterQualityItem): WaterQualityItemResource {
    return {
      id: entity.id,
      stationId: entity.stationId,
      waterType: entity.waterType,
      regionCode: entity.regionCode,
      regionName: entity.regionName,
      consumptionLevel: entity.consumptionLevel,
      qualityIndex: entity.qualityIndex,
      year: entity.year,
      registeredAt: entity.registeredAt
    };
  }

  /** Converts a response envelope into domain entities. */
  toEntitiesFromResponse(response: WaterQualityItemsResponse): WaterQualityItem[] {
    return response.waterQualityItems.map(resource => this.toEntityFromResource(resource));
  }
}
