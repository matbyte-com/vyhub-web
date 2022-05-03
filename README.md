# nyx-web

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Run your unit tests
```
npm run test:unit
```

### E2E Tests
#### simple run in terminal
```
npx cypress run 
```
#### open the cypress tool
```
npx cypress open 
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Docs
VyHub Web is built using [Vue2](https://v2.vuejs.org/v2/guide/).

## Project Structure
Vue uses (reusable) components.

- New pages are stored in the `views` folder
- Components are stored in the `components` folder, using subfolders for the corrosponding view
- Forms are written with [VJSF](https://koumoul-dev.github.io/vuetify-jsonschema-form/latest/) and stored in the `forms` folder
- Commonly used functions are placed in the `services` folder
 
## API Calls
API calls are made using openapi. Using openapi only the route name has to specified, no absolute path is given.

## Reusable Components
Some components are programmed to be reused.  

> Use these components whenever you can

This includes but not limited to:
1. `DataTable` and `PaginatedDataTable` (for large count of results)
2. `GenForm` and `DialogForm` (for displaying forms)
3. `ConfirmationDialog` and `DeleteConfirmationDialog`
4. `PageTitle`

## Internationalization
VyHub is translated with vue-i18n.  

- Define keys in the english file `en.json`
- Create a new level for new views (e.g. `_ban` for ban related keys)
- Store commonly used translations on the top-level

