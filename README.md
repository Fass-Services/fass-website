# FASS Services Website

The official website for FASS Services — a software studio building products and solving client problems.

**Live:** [fassservices.com](https://fassservices.com)

---

## Strategy Documents

FASS Services operates as the **central strategy hub** for all our products and client projects. This hidden folder serves as our **brainstorming layer** — where market research, value propositions, and go-to-market strategies are developed before execution.

**Why here?** The FASS website represents our company identity. Keeping strategy documents alongside it ensures all product thinking flows from the same source — unified positioning, consistent messaging, and coordinated planning across SuiviPro, HomeHaven, Tax Companion, Autografik, and client projects.

### Location

```
.strategy/
├── README.md                    # Overview and index
├── market-research/             # Industry data, TAM/SAM/SOM
├── value-propositions/          # Product-specific value props
│   ├── tax-companion-value-prop.md
│   └── autografik-value-prop.md
├── marketing-plans/             # Campaign strategies, budgets
└── competitive-analysis/        # Competitor breakdowns
```

### Accessing Hidden Folders

**In Finder (macOS):**
```
Cmd + Shift + .    # Toggle hidden files visibility
```

**In VS Code:**
Hidden folders should be visible by default in the explorer sidebar.

**In Terminal:**
```bash
ls -la              # List all files including hidden
cd .strategy        # Navigate into the folder
```

### Reading with MDTS

To read strategy documents in a formatted terminal viewer:

```bash
# Navigate to the strategy folder
cd .strategy

# Run MDTS (Markdown Terminal Server)
npx mdts

# Or read a specific file
npx mdts value-propositions/tax-companion-value-prop.md
```

---

## Development

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 21.1.4.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Vitest](https://vitest.dev/) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.
