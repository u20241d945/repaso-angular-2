/**
 * Represents a regional operator retrieved from DummyJSON.
 *
 * @author u20241d945
 */
export class RegionalOperator implements BaseEntity {
  readonly #id: number;
  readonly #fullName: string;
  readonly #regionCode: string;
  readonly #regionName: string;

  constructor(props: { id: number; fullName: string; regionCode: string; regionName: string }) {
    this.#id = props.id;
    this.#fullName = props.fullName;
    this.#regionCode = props.regionCode;
    this.#regionName = props.regionName;
  }

  get id(): number { return this.#id; }
  get fullName(): string { return this.#fullName; }
  get regionCode(): string { return this.#regionCode; }
  get regionName(): string { return this.#regionName; }
}
import { BaseEntity } from '../../../shared/domain/model/base-entity';

