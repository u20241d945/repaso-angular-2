# GWO Water Monitoring Platform

GWO Water Monitoring Platform is an Angular application for reviewing and registering international water quality indicators. It combines a local REST API for monitoring data with DummyJSON regional operators.

## Author

- Student code: `u20241d945`
- Full name: replace this line before submission

## Features

- Responsive Home view with a two-column water quality card grid.
- New Water Quality Record form with automatic station and indicator selection.
- Regional operators retrieved from DummyJSON.
- Validation of the water quality business rule.
- English and Spanish interface with English as the default language.
- Semantic lazy-loaded routes and a page-not-found view.
- Signal-based state management.
- Domain-driven, layered, and component-based organization.
- Shared base contracts for entities, assemblers, API facades, and REST endpoints.
- Encapsulated domain entities using native private fields and public getters.

## Stack

- Angular 21.2 standalone components
- Angular Material 21.2
- Angular Router and HttpClient
- Angular Signals and Reactive Forms
- ngx-translate 18
- json-server 0.17.4
- DummyJSON API

## Installation

Install dependencies from the project folder:

```bash
npm install
```

## Running the application

Start Angular and json-server in one terminal:

```bash
npm run dev
```

The application is available at `http://localhost:4200/` and redirects to `/home`.

The local endpoints are:

- `http://localhost:3000/water-monitoring-stations`
- `http://localhost:3000/water-quality-items`

Press `Ctrl+C` to stop both processes.

### Running each service separately

Terminal 1:

```bash
npm run api
```

Terminal 2:

```bash
npm start
```

## Routes

- `/home`: Home and water quality record summaries.
- `/water-quality/new`: New Water Quality Record form.
- Any unsupported route: page-not-found view.

## API configuration

API URLs and endpoint paths are defined in `src/environments/environment.ts` and
`src/environments/environment.development.ts`. The local database is located at `server/db.json`.

The new-record form only requests the water type and regional operator. The station, consumption level, quality index, year, record identifier, and registration timestamp are obtained or generated automatically.

## Architecture

The code follows the same bounded-context and layered conventions used in the course reference project:

- `monitoring`: water stations, quality records, registration use case, and local API access.
- `water`: regional operators obtained from DummyJSON and water-region rules.
- `shared`: reusable domain contracts, REST infrastructure, layout, toolbar, and error views.

Each business bounded context separates `domain`, `application`, `infrastructure`, and
`presentation`. API services extend `BaseApi` and compose endpoint objects. Endpoints use
typed resources, response envelopes, and assemblers; application stores expose readonly
Angular Signals to the presentation layer.

## Build

```bash
npm run build
```

The production files are created in `dist/ea17952u20241d945/`.

## Tests

```bash
npm test -- --watch=false --browsers=ChromeHeadless
```

## Creating the project from an empty folder

```bash
npx @angular/cli@21 new ea17952u20241d945 --standalone --routing --style=css --skip-git
cd ea17952u20241d945
npx ng add @angular/material@21
npm install @ngx-translate/core@18 @ngx-translate/http-loader@18 json-server@0.17.4
npm install --save-dev concurrently
```

## Submission checklist

1. Replace the author placeholder with the developer's full name.
2. Run the build and tests.
3. Remove `node_modules` before packaging.
4. Name the ZIP file `ea17952u20241d945.zip`.
