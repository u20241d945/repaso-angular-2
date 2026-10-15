/**
 * Represents the relevant fields of a DummyJSON user resource.
 *
 * @author u20241d945
 */
export interface DummyUserResource extends BaseResource {
  id: number;
  firstName: string;
  lastName: string;
  address: {
    stateCode: string;
    country: string;
  };
}
import { BaseResource } from '../../../shared/infrastructure/base-response';

