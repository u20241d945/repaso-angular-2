# Simple Project Reuse Guide

This guide explains which parts you can keep and which parts you should change for another
evaluation.

## 1. Main idea

Do not start with the screen. First identify the domain data and follow this flow:

```text
Entity -> Resource -> Assembler -> Endpoint -> API Service -> Store -> View
```

Current example:

```text
WaterQualityItem
  -> WaterQualityItemResource
  -> WaterQualityItemAssembler
  -> WaterQualityItemsApiEndpoint
  -> MonitoringApiService
  -> WaterQualityStore
  -> Home
```

## 2. Parts you normally do not need to change

You can reuse these files in another evaluation:

```text
shared/domain/model/base-entity.ts
shared/infrastructure/base-api.ts
shared/infrastructure/base-api-endpoint.ts
shared/infrastructure/base-assembler.ts
shared/infrastructure/base-response.ts
shared/presentation/components/base-form/base-form.ts
shared/presentation/components/layout/
shared/presentation/views/page-not-found/
```

You can also keep the general Angular Material, `HttpClient`, Router, `ngx-translate`,
`json-server`, and `npm run dev` configuration.

## 3. Parts you must adapt to the new case

Change only the domain-specific parts:

- Bounded-context names.
- Entities and their properties.
- Resources, responses, and requests based on the API JSON.
- Endpoint paths in the environment files.
- Business rules.
- Translation texts.
- Requested components and views.

Do not keep names such as `WaterQualityItem` when the new case is about products, bookings, or
vehicles. Reuse the pattern, but change the domain vocabulary.

## 4. Recipe for a new entity

Suppose the evaluation asks for products.

### Entity

```ts
export class Product implements BaseEntity {
  readonly #id: number;
  readonly #name: string;

  constructor(props: { id: number; name: string }) {
    this.#id = props.id;
    this.#name = props.name;
  }

  get id(): number { return this.#id; }
  get name(): string { return this.#name; }
}
```

### Resource

```ts
export interface ProductResource extends BaseResource {
  id: number;
  name: string;
}
```

### Endpoint

```ts
export class ProductsApiEndpoint extends BaseApiEndpoint<
  Product,
  ProductResource,
  ProductsResponse,
  ProductAssembler
> {
  constructor(http: HttpClient) {
    super(http, `${environment.apiBaseUrl}/products`, new ProductAssembler());
  }
}
```

The base endpoint already provides CRUD operations. Add another method only when the evaluation
requires a special query.

## 5. Rule for keeping responsibilities separate

- A view must not call `HttpClient` directly.
- A store must not depend on API resources.
- An endpoint must not control buttons or navigation.
- An assembler must not make HTTP requests.
- An entity must not import Angular.

If one class starts doing several of these jobs, its logic is probably in the wrong layer.

## 6. Recommended order during the evaluation

1. Identify the entities, endpoints, routes, and business rules.
2. Prepare `db.json` and the environment files.
3. Implement the entity, resource, and assembler.
4. Implement the endpoint, API service, and store.
5. Implement the views and routes.
6. Add translations and styles.
7. Run the build and tests.

## 7. Commands worth remembering

```bash
npm install
npm run dev
npm run build
npm test -- --watch=false --browsers=ChromeHeadless
```

`npm run dev` starts Angular and `json-server` together, so you do not need two terminals.

## 8. Starting from a WebStorm Empty Project

If WebStorm already created an empty folder, open its terminal and confirm that you are inside
that folder:

```powershell
Get-Location
```

Create the Angular project directly in the current folder. Replace `project-name` with the name
required by the evaluation:

```powershell
npx @angular/cli@21 new project-name --directory . --standalone --routing --style=css --skip-git
```

Option meanings:

| Option | Result |
|---|---|
| `--directory .` | Uses the current empty folder instead of creating a nested folder. |
| `--standalone` | Creates standalone components without `AppModule`. |
| `--routing` | Configures Angular Router. |
| `--style=css` | Uses CSS stylesheets. |
| `--skip-git` | Avoids creating another Git repository inside the WebStorm project. |

If you are still in the parent folder and want Angular to create the project folder, use:

```powershell
cd C:\Users\NoName\WebstormProjects
npx @angular/cli@21 new project-name --standalone --routing --style=css
cd project-name
```

## 9. Installing the usual dependencies

Run these commands from the root of the new project:

```powershell
npx ng add @angular/material@21
npm install @ngx-translate/core@18 @ngx-translate/http-loader@18
npm install json-server@0.17.4
npm install --save-dev concurrently
npx ng generate environments
```

`ng add @angular/material` configures Angular Material. `ng generate environments` creates
`environment.ts`, `environment.development.ts`, and the development file replacement.

Create `server/db.json` manually with the collections required by the evaluation. For example:

```json
{
  "products": []
}
```

Add these entries to the `scripts` property in `package.json`:

```json
{
  "scripts": {
    "start": "ng serve",
    "api": "json-server --watch server/db.json --port 3000",
    "dev": "concurrently --kill-others \"npm:api\" \"npm:start\"",
    "build": "ng build",
    "test": "ng test"
  }
}
```

You can then start Angular and the API in one terminal:

```powershell
npm run dev
```

## 10. Commands for generating files

Angular accepts both the full command and its abbreviation. These commands are equivalent:

```powershell
npx ng generate component products/presentation/views/product-list
npx ng g c products/presentation/views/product-list
```

Recommended commands for the course structure:

```powershell
# Components and views
npx ng g c products/presentation/views/product-list --standalone --skip-tests
npx ng g c products/presentation/components/product-card --standalone --skip-tests

# Entity
npx ng g class products/domain/model/product --type=entity --skip-tests

# Signal-based store
npx ng g service products/application/stores/product --type=store --skip-tests

# API service
npx ng g service products/infrastructure/services/product-api --skip-tests

# Endpoint and assembler
npx ng g class products/infrastructure/endpoints/products-api --type=endpoint --skip-tests
npx ng g class products/infrastructure/assemblers/product --type=assembler --skip-tests

# API contracts
npx ng g interface products/infrastructure/resources/product resource
npx ng g interface products/infrastructure/responses/products response
npx ng g interface products/infrastructure/requests/create-product request
```

The CLI automatically creates missing folders. Route files such as `products.routes.ts` should
normally be created manually because they export a `Routes` constant instead of a class.

Other useful generators:

| Need | Command |
|---|---|
| Service | `npx ng g service path/name --skip-tests` |
| Component | `npx ng g component path/name --standalone --skip-tests` |
| Class | `npx ng g class path/name --type=type --skip-tests` |
| Interface | `npx ng g interface path/name type` |
| Pipe | `npx ng g pipe path/name --standalone --skip-tests` |
| Directive | `npx ng g directive path/name --standalone --skip-tests` |
| Guard | `npx ng g guard path/name --skip-tests` |
| Interceptor | `npx ng g interceptor path/name --skip-tests` |
| Environments | `npx ng g environments` |

Before creating many files, add `--dry-run` to preview the result without writing anything:

```powershell
npx ng g c products/presentation/views/product-list --dry-run
```

## 11. Complete order for a new evaluation

```text
1. Create the Angular project.
2. Install Material, ngx-translate, json-server, and concurrently.
3. Create db.json and configure the environment files.
4. Copy the reusable shared folder.
5. Generate the bounded context and its layers.
6. Implement Entity, Resource, Response/Request, and Assembler.
7. Implement Endpoint, API Service, and Store.
8. Implement components, views, and routes.
9. Add translations and styles.
10. Run the build and tests.
```

You do not need to generate everything at once. Complete one working feature first and continue
with the next feature after the first one compiles.

## 12. Final checklist

- The empty route redirects correctly.
- An unknown route displays the page-not-found view.
- JSON property names match the resources.
- The assembler copies every required field.
- Business rules are checked before saving.
- The interface works in English and Spanish.
- No test data remains in the local database.
- The project builds without errors.
