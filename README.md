# MarjoryProject

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 12.2.7.

The purpose of this application is to present employees, retrieved thanks to the supplied JSON file, and to draw statistics from them. It is also possible to navigate to a second page presenting detailed user informations.
The whole application has been designed using the mobile-first principle and is therefore completely responsive.

The original JSON file has been slightly edited because 'recrutement' was misspelled (wrote as 'recutementDate'), which made less sense when calling variables (so the change was purely aesthetic).

Enjoy !

## JSON server

Run `json-server --watch db.json` as a first step, to have access to the json used as a databse.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI Overview and Command Reference](https://angular.io/cli) page.
