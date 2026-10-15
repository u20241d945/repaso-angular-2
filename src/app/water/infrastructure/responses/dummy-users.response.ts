import { DummyUserResource } from '../resources/dummy-user.resource';
import { BaseResponse } from '../../../shared/infrastructure/base-response';

/**
 * Represents the paginated user response returned by DummyJSON.
 *
 * @author u20241d945
 */
export interface DummyUsersResponse extends BaseResponse {
  users: DummyUserResource[];
  total: number;
  skip: number;
  limit: number;
}
