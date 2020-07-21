##How to run

Firstly, run

`npm i`

to install all dependencies.



And then run

`tnpm start`

to start the demo. 



After startup, please open "http://localhost:3000" (w/o quotes) to view it.



##About design

This demo only supports single user, but can support multiple users with a little changes.

### Domain model

Three main concepts:

- Dashboard: a dashboard with id, name
- Def: Widget definition, used to create widget instance
- Widget: instance of widget, i.e. widget instance in a dashboard
- Field: each widget could have one or more fields, user can customize a widget via these fields.

###UI

Two pages:

- /Home: maintain dashboards and widgets
- /Share: used to view shared dashboard

### Directory

- src: source code folder
  - model: domain models
  - persistence: mocked persistence layer
  - reducers: react reducers, with react-thunk support
  - ui: all ui elements, incl. pages and components
  - util: utilities
- test: test code folder
- widget: 
  - Label.js: a remote widget definition (not implemented, please ignore)
  - releaseData.json: mock release data for "Project Switch" widget

