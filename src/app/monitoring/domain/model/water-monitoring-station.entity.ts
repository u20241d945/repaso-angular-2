import { BaseEntity } from '../../../shared/domain/model/base-entity';

/** Supported water categories in the monitoring domain. */
export type WaterType =
  | 'river'
  | 'lake'
  | 'groundwater'
  | 'rainwater'
  | 'glacier'
  | 'desalination';

/**
 * Represents a physical water monitoring station.
 *
 * @author u20241d945
 */
export class WaterMonitoringStation implements BaseEntity {
  readonly #id: number;
  readonly #name: string;
  readonly #waterType: WaterType;

  constructor(props: { id: number; name: string; waterType: WaterType }) {
    this.#id = props.id;
    this.#name = props.name;
    this.#waterType = props.waterType;
  }

  get id(): number {
    return this.#id;
  }

  get name(): string {
    return this.#name;
  }

  get waterType(): WaterType {
    return this.#waterType;
  }
}
