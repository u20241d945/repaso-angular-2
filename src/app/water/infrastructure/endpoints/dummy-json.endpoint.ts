import { HttpClient } from '@angular/common/http';
import { environment } from '../../../../environments/environment';
import { BaseApiEndpoint } from '../../../shared/infrastructure/base-api-endpoint';
import { RegionalOperator } from '../../domain/model/regional-operator.entity';
import { RegionalOperatorAssembler } from '../assemblers/regional-operator.assembler';
import { DummyUserResource } from '../resources/dummy-user.resource';
import { DummyUsersResponse } from '../responses/dummy-users.response';

/**
 * Centralizes DummyJSON endpoint construction.
 *
 * @author u20241d945
 */
export class DummyJsonEndpoint extends BaseApiEndpoint<
  RegionalOperator,
  DummyUserResource,
  DummyUsersResponse,
  RegionalOperatorAssembler
> {
  constructor(http: HttpClient) {
    super(
      http,
      `${environment.regionalOperatorsApiBaseUrl}${environment.regionalOperatorsEndpointPath}`,
      new RegionalOperatorAssembler()
    );
  }
}
