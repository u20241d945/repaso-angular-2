/**
 * Marker contract for response envelopes returned by REST APIs.
 *
 * @author u20241d945
 */
export interface BaseResponse {}

/**
 * Base contract for REST resources with a numeric identifier.
 *
 * @author u20241d945
 */
export interface BaseResource {
  id: number;
}
