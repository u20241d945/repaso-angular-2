# GWO Water Monitoring Platform

Simple Angular reference project for displaying and registering international water-quality
records. It follows the layered and bounded-context conventions used in the course while
keeping each responsibility small and easy to locate.

## Author

- Student code: `u20241d945`
- Full name: replace this line before submission

## Quick start

From the project folder, run:

```bash
npm install
npm run dev
```

Open `http://localhost:4200`. The `dev` command starts Angular and `json-server` together.
Press `Ctrl+C` to stop both processes.

## What the application does

- Shows existing water-quality records on `/home`.
- Creates a record on `/water-quality/new`.
- Reads monitoring data from the local fake API.
- Reads regional operators from DummyJSON.
- Supports English and Spanish.
- Shows a page-not-found view for unsupported routes.

## The architecture in one line

```text
View -> Store -> API Service -> Endpoint -> HTTP API
                                    |
Entity <- Assembler <- Resource/Response
```

Each piece answers one question:

| Piece | Responsibility |
|---|---|
| View or component | What does the user see and do? |
| Store | What state does the screen need? |
| API service | What operations does this bounded context offer? |
| Endpoint | Which URL and HTTP method are used? |
| Resource/Response/Request | What shape does the API JSON have? |
| Assembler | How is API JSON converted into a domain entity? |
| Entity | What data and business rules belong to the domain? |

## Project structure

```text
src/app/
├── monitoring/                 # Main business bounded context
│   ├── domain/                 # Water entities and rules
│   ├── application/            # Signal-based state stores
│   ├── infrastructure/         # API, endpoints, DTOs and assemblers
│   └── presentation/           # Home, form and summary component
├── water/                      # Regional operators and region rules
│   ├── domain/
│   ├── application/
│   └── infrastructure/
└── shared/                     # Generic code reusable in another project
    ├── domain/
    ├── infrastructure/
    └── presentation/
```

## Reusable building blocks

The following files are intentionally generic and can be copied without changing their
implementation:

- `BaseEntity`: requires a numeric entity identifier.
- `BaseAssembler`: defines entity/resource conversion methods.
- `BaseApiEndpoint`: provides `getAll`, `getById`, `create`, `update`, and `delete`.
- `BaseApi`: base type for an API facade that composes endpoints.
- `BaseForm`: contains reusable reactive-form validation helpers.
- `Layout`: provides the application shell and router outlet.

See [`docs/REUSE-GUIDE.md`](docs/REUSE-GUIDE.md) for a practical guide covering project
initialization, Angular CLI commands, and adaptation to another evaluation.

See [`docs/EXAM-REFERENCE-LINKS.md`](docs/EXAM-REFERENCE-LINKS.md) for a task-based list of
official Angular, Angular Material, and supporting-library documentation to consult during the
evaluation.

## How to add another bounded context

For a new feature such as `products`, create these folders:

```text
products/
├── domain/model/product.entity.ts
├── application/stores/product.store.ts
├── infrastructure/
│   ├── assemblers/product.assembler.ts
│   ├── endpoints/products-api.endpoint.ts
│   ├── resources/product.resource.ts
│   ├── responses/products.response.ts
│   └── services/product-api.service.ts
└── presentation/views/product-list/
```

Then follow this order:

1. Define the entity.
2. Define the API resource or request.
3. Create the assembler.
4. Create an endpoint extending `BaseApiEndpoint`.
5. Expose the endpoint through an API service extending `BaseApi`.
6. Use that service from a Signal store and consume the store from the view.

## API configuration

Environment values are located in:

- `src/environments/environment.ts`
- `src/environments/environment.development.ts`

Local data is stored in `server/db.json` and exposed at:

- `http://localhost:3000/water-monitoring-stations`
- `http://localhost:3000/water-quality-items`

Regional operators are loaded from `https://dummyjson.com/users?limit=100`.

## Available commands

| Command | Purpose |
|---|---|
| `npm run dev` | Starts Angular and the local API in one terminal. |
| `npm start` | Starts only Angular. |
| `npm run api` | Starts only `json-server`. |
| `npm run build` | Creates the production build. |
| `npm test -- --watch=false --browsers=ChromeHeadless` | Runs the unit tests once. |

## Creating the project from an empty folder

```bash
npx @angular/cli@21 new ea17952u20241d945 --standalone --routing --style=css --skip-git
cd ea17952u20241d945
npx ng add @angular/material@21
npm install @ngx-translate/core@18 @ngx-translate/http-loader@18 json-server@0.17.4
npm install --save-dev concurrently
```

## Submission checklist

1. Replace the full-name placeholder.
2. Confirm the API URLs and requested field names.
3. Run the build and tests.
4. Remove `node_modules` before creating the ZIP.
5. Name the ZIP file `ea17952u20241d945.zip`.
