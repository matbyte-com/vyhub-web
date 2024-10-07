# vyhub-web

This is the official front end for the [VyHub](https://vyhub.net) donation and management system. VyHub helps to monetize and manage your gaming community in many aspects. Feel free to make yourself familiar with this repo and open pull-requests, you can also this repo as a basis for your custom frontend, smartphone apps or more! 

## VyHub features
- 🛒 Shop / donation system -> sell items on your gameserver for real money
- 🛠️ Homepage builder
- 🚫 Bans
- ⚠️ Warnings
- 🔁 Synchronize player groups with admin mods
- 📈 Player statistics (Playtime...)
- 📢 Periodic adverts


## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run dev
```

### Compiles and minifies for production
```
npm run build
```

### Lints and fixes files
```
npm run lint
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).

# Docs
VyHub Web is built using [Vue3](https://vuejs.org/) and [Vuetify](https://vuetifyjs.com/).

## Config
Config options are located in `/public/config.js`.   
! CORS backend variable needs to be set ! -> TODO Documentation

## Contributing
Check the issues for suitable projects.  

> Open a pull request when your feature/bugfix is ready for merging

## Project Structure
Vue uses (reusable) components.

- New pages are stored in the `views` folder
- Components are stored in the `components` folder, using subfolders for the corresponding view
- Forms are written with [VJSF](https://koumoul-dev.github.io/vuetify-jsonschema-form/latest/) and stored in the `forms` folder
- Commonly used functions are placed in the `services` folder
 
## API Calls
API calls are made using openapi. Using openapi only the route name has to be specified, no absolute path is given.

## Reusable Components
Some components are programmed to be reused.  

> Use these components whenever you can

This includes but is not limited to:
1. `DataTable` and `PaginatedDataTable` (for a large count of results)
2. `GenForm` and `DialogForm` (for displaying forms)
3. `ConfirmationDialog` and `DeleteConfirmationDialog`
4. `PageTitle`

## Internationalization
VyHub is translated with vue-i18n.  

- Define keys in the English file `en.json`
- Create a new level for new views (e.g. `_ban` for ban-related keys)
- Store commonly used translations on the top-level

