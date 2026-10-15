import { RegionalOperator } from '../../domain/model/regional-operator.entity';
import { BaseAssembler } from '../../../shared/infrastructure/base-assembler';
import { DummyUserResource } from '../resources/dummy-user.resource';
import { DummyUsersResponse } from '../responses/dummy-users.response';

/**
 * Maps DummyJSON user resources to regional operator domain entities.
 *
 * @author u20241d945
 */
export class RegionalOperatorAssembler implements BaseAssembler<
  RegionalOperator,
  DummyUserResource,
  DummyUsersResponse
> {
  /** Converts one DummyJSON user into a regional operator. */
  toEntityFromResource(resource: DummyUserResource): RegionalOperator {
    return new RegionalOperator({
      id: resource.id,
      fullName: `${resource.firstName} ${resource.lastName}`,
      regionCode: `US-${resource.address.stateCode}`,
      regionName: resource.address.country
    });
  }

  /** Converts a regional operator back to its resource representation. */
  toResourceFromEntity(entity: RegionalOperator): DummyUserResource {
    const [firstName, ...lastNameParts] = entity.fullName.split(' ');
    return {
      id: entity.id,
      firstName,
      lastName: lastNameParts.join(' '),
      address: {
        stateCode: entity.regionCode.replace(/^US-/, ''),
        country: entity.regionName
      }
    };
  }

  /** Converts the DummyJSON response into regional operators. */
  toEntitiesFromResponse(response: DummyUsersResponse): RegionalOperator[] {
    return response.users
      .filter(resource => Boolean(resource.address?.stateCode && resource.address?.country))
      .map(resource => this.toEntityFromResource(resource));
  }
}
