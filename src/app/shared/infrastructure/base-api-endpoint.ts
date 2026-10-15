import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, catchError, map, throwError } from 'rxjs';
import { BaseEntity } from '../domain/model/base-entity';
import { BaseAssembler } from './base-assembler';
import { BaseResource, BaseResponse } from './base-response';

/**
 * Provides reusable REST operations for one endpoint.
 *
 * @author u20241d945
 */
export abstract class BaseApiEndpoint<
  TEntity extends BaseEntity,
  TResource extends BaseResource,
  TResponse extends BaseResponse,
  TAssembler extends BaseAssembler<TEntity, TResource, TResponse>
> {
  protected constructor(
    protected readonly http: HttpClient,
    protected readonly endpointUrl: string,
    protected readonly assembler: TAssembler
  ) {}

  /** Retrieves and maps every resource exposed by the endpoint. */
  getAll(): Observable<TEntity[]> {
    return this.http.get<TResponse | TResource[]>(this.endpointUrl).pipe(
      map(response => Array.isArray(response)
        ? response.map(resource => this.assembler.toEntityFromResource(resource))
        : this.assembler.toEntitiesFromResponse(response)),
      catchError(this.handleError('Failed to fetch entities'))
    );
  }

  /** Retrieves and maps one resource by identifier. */
  getById(id: number): Observable<TEntity> {
    return this.http.get<TResource>(`${this.endpointUrl}/${id}`).pipe(
      map(resource => this.assembler.toEntityFromResource(resource)),
      catchError(this.handleError('Failed to fetch entity'))
    );
  }

  /** Persists an entity and maps the created resource. */
  create(entity: TEntity): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.post<TResource>(this.endpointUrl, resource).pipe(
      map(created => this.assembler.toEntityFromResource(created)),
      catchError(this.handleError('Failed to create entity'))
    );
  }

  /** Replaces an existing resource and maps the API response. */
  update(entity: TEntity, id: number): Observable<TEntity> {
    const resource = this.assembler.toResourceFromEntity(entity);
    return this.http.put<TResource>(`${this.endpointUrl}/${id}`, resource).pipe(
      map(updated => this.assembler.toEntityFromResource(updated)),
      catchError(this.handleError('Failed to update entity'))
    );
  }

  /** Deletes a resource by identifier. */
  delete(id: number): Observable<void> {
    return this.http.delete<void>(`${this.endpointUrl}/${id}`).pipe(
      catchError(this.handleError('Failed to delete entity'))
    );
  }

  /** Translates HTTP failures into application-friendly errors. */
  protected handleError(operation: string) {
    return (error: HttpErrorResponse): Observable<never> => {
      const detail = error.status === 404
        ? 'Resource not found'
        : error.error instanceof ErrorEvent
          ? error.error.message
          : error.statusText || 'Unexpected error';
      return throwError(() => new Error(`${operation}: ${detail}`));
    };
  }
}
