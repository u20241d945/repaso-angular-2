# Useful Documentation for the Evaluation

This is a quick reference, not a reading list. Open the page that matches the problem you are
solving and search for a small example that you can adapt.

The project uses **Angular 21** and **Angular Material 21**. Prefer version 21 documentation when
the version selector is available. The main Angular website may show a newer version.

Last checked: October 15, 2026.

## 1. Open these pages first

| Page | Use it for |
|---|---|
| [Angular 21 overview](https://v21.angular.dev/overview) | Angular 21 concepts and documentation entry point. |
| [Angular Material 21 components](https://v21.material.angular.dev/components/categories) | Find the Material component required by the statement. |
| [Angular CLI generators](https://angular.dev/tools/cli/schematics) | Remember `ng generate` commands and their options. |
| [Project reuse guide](REUSE-GUIDE.md) | Know which local files to keep and which domain files to replace. |

The link provided by the professor, [current Angular Material components](https://material.angular.dev/components/categories),
is also useful. If an example differs from this project, switch to the version 21 page above.

## 2. Angular: page to use for each task

| When you need to... | Documentation |
|---|---|
| Create or understand a standalone component | [Components](https://angular.dev/guide/components) |
| Use interpolation, property binding, events, `@if`, or `@for` | [Templates](https://angular.dev/guide/templates) |
| Store reactive state with `signal`, `computed`, `set`, or `update` | [Signals](https://angular.dev/guide/signals) |
| Inject a service with `inject()` | [Dependency injection](https://angular.dev/guide/di) |
| Add navigation, parameters, redirects, lazy loading, or a 404 route | [Routing](https://angular.dev/guide/routing) and [Define routes](https://angular.dev/guide/routing/define-routes) |
| Build a form with `FormGroup` and `FormControl` | [Reactive forms](https://angular.dev/guide/forms/reactive-forms) |
| Add required, length, range, or custom validation | [Form validation](https://angular.dev/guide/forms/form-validation) |
| Configure `HttpClient` | [HTTP client setup](https://angular.dev/guide/http/setup) |
| Use GET, POST, PUT, PATCH, DELETE, query parameters, or error handling | [Making HTTP requests](https://angular.dev/guide/http/making-requests) |
| Configure development and production API URLs | [Build environments](https://angular.dev/tools/cli/environments) |
| Check naming and project organization | [Angular style guide](https://angular.dev/style-guide) |
| Create or run tests | [Testing](https://angular.dev/guide/testing) |

## 3. Angular Material: common evaluation components

These links use the same major version as this project.

| UI requirement | Material 21 page |
|---|---|
| Header or navigation bar | [Toolbar](https://v21.material.angular.dev/components/toolbar/overview) |
| Display one record or summary | [Card](https://v21.material.angular.dev/components/card/overview) |
| Actions such as Save, Cancel, or Add | [Button](https://v21.material.angular.dev/components/button/overview) |
| Text and numeric inputs | [Form field](https://v21.material.angular.dev/components/form-field/overview) and [Input](https://v21.material.angular.dev/components/input/overview) |
| Choose one option | [Select](https://v21.material.angular.dev/components/select/overview) |
| Display records in rows and columns | [Table](https://v21.material.angular.dev/components/table/overview) |
| Show a success or error message | [Snack bar](https://v21.material.angular.dev/components/snack-bar/overview) |
| Show loading state | [Progress spinner](https://v21.material.angular.dev/components/progress-spinner/overview) |
| Add Material icons | [Icon](https://v21.material.angular.dev/components/icon/overview) |

When copying a Material example, also copy the required import into the component's `imports`
array. This project uses standalone components, so an old `NgModule` example may not fit directly.

## 4. Libraries and APIs used by this template

| Tool | Documentation | Why it matters here |
|---|---|---|
| ngx-translate | [Translate components and templates](https://ngx-translate.org/getting-started/translating-your-components/) | Translate labels with the pipe or service. |
| json-server 0.17.4 | [Version used by this project](https://github.com/typicode/json-server/tree/v0.17.4) | Run a local REST API from `server/db.json`. |
| DummyJSON | [Users API](https://dummyjson.com/docs/users) | Understand the external users response and query parameters. |

Use documentation for the installed version. Commands or response formats from another major
version can be different.

## 5. Fast lookup during the evaluation

| Problem in the statement | Open this first |
|---|---|
| "Create a page/component" | Components, then CLI generators. |
| "List all records" | HTTP requests, `@for`, then Card or Table. |
| "Register/create a record" | Reactive forms, validation, then HTTP POST. |
| "Filter or calculate a value" | Signals and `computed`. |
| "Navigate to details/edit" | Routing and route parameters. |
| "Use a local fake API" | json-server and `server/db.json`. |
| "Use an external API" | Its response documentation, then the local Resource and Assembler pattern. |
| "Show feedback or loading" | Snack bar and Progress spinner. |
| "Support two languages" | ngx-translate. |
| "The component is unknown" | Verify the Material import in the standalone component. |

## 6. Workflow

1. Read the statement and underline entities, properties, routes, API URLs, and business rules.
2. Use [REUSE-GUIDE.md](REUSE-GUIDE.md) to identify what must change.
3. Open only the official page for the feature you are currently implementing.
4. Copy the smallest relevant example and adapt its names and data types.
5. Run `npm run build` regularly so errors stay small and easy to locate.


