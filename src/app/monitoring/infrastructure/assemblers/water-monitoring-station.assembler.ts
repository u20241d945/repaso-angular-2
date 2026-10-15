import { WaterMonitoringStation } from '../../domain/model/water-monitoring-station.entity';
import { BaseAssembler } from '../../../shared/infrastructure/base-assembler';
import { WaterMonitoringStationResource } from '../resources/water-monitoring-station.resource';
import { WaterMonitoringStationsResponse } from '../responses/water-monitoring-stations.response';

/**
 * Converts monitoring station API resources into domain entities.
 *
 * @author u20241d945
 */
export class WaterMonitoringStationAssembler implements BaseAssembler<
  WaterMonitoringStation,
  WaterMonitoringStationResource,
  WaterMonitoringStationsResponse
> {
  /** Converts one API resource into a domain entity. */
  toEntityFromResource(resource: WaterMonitoringStationResource): WaterMonitoringStation {
    return new WaterMonitoringStation({
      id: resource.id,
      name: resource.name,
      waterType: resource.waterType
    });
  }

  /** Converts a domain entity into an API resource. */
  toResourceFromEntity(entity: WaterMonitoringStation): WaterMonitoringStationResource {
    return { id: entity.id, name: entity.name, waterType: entity.waterType };
  }

  /** Converts a response envelope into domain entities. */
  toEntitiesFromResponse(response: WaterMonitoringStationsResponse): WaterMonitoringStation[] {
    return response.waterMonitoringStations.map(resource => this.toEntityFromResource(resource));
  }
}
