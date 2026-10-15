/**
 * Minimal contract implemented by domain entities across bounded contexts.
 *
 * @author u20241d945
 */
export interface BaseEntity {
  /** Unique identifier for the entity. */
  readonly id: number;
}
