import { WaterType } from './water-monitoring-station.entity';
import { BaseEntity } from '../../../shared/domain/model/base-entity';

/**
 * Represents a registered international water quality record.
 *
 * @author u20241d945
 */
export class WaterQualityItem implements BaseEntity {
  readonly #id: number;
  readonly #stationId: number;
  readonly #waterType: WaterType;
  readonly #regionCode: string;
  readonly #regionName: string;
  readonly #consumptionLevel: number;
  readonly #qualityIndex: number;
  readonly #year: number;
  readonly #registeredAt: string;

  constructor(props: {
    id: number;
    stationId: number;
    waterType: WaterType;
    regionCode: string;
    regionName: string;
    consumptionLevel: number;
    qualityIndex: number;
    year: number;
    registeredAt: string;
  }) {
    this.#id = props.id;
    this.#stationId = props.stationId;
    this.#waterType = props.waterType;
    this.#regionCode = props.regionCode;
    this.#regionName = props.regionName;
    this.#consumptionLevel = props.consumptionLevel;
    this.#qualityIndex = props.qualityIndex;
    this.#year = props.year;
    this.#registeredAt = props.registeredAt;
  }

  get id(): number { return this.#id; }
  get stationId(): number { return this.#stationId; }
  get waterType(): WaterType { return this.#waterType; }
  get regionCode(): string { return this.#regionCode; }
  get regionName(): string { return this.#regionName; }
  get consumptionLevel(): number { return this.#consumptionLevel; }
  get qualityIndex(): number { return this.#qualityIndex; }
  get year(): number { return this.#year; }
  get registeredAt(): string { return this.#registeredAt; }

  /** Indicates whether the record satisfies the business rule. */
  get isValid(): boolean {
    return this.qualityIndex > 0 && this.qualityIndex >= this.consumptionLevel;
  }
}
