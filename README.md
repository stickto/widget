## 1. How to run

Firstly, run

`npm i`

to install all dependencies.



And then run

`npm start`

to start the demo. 



After startup, please open "http://localhost:3000" (w/o quotes) to view it.



You can also run

`npm test`

to check unit test, but only one ut case is provided due to time limitation.



## 2. Predefined widget defintions

Four widget definitions are predefined and shipped within the demo (see **/src/persistence/SampleWidgets.ts**):

- Test Widget: Only for test, show all fields and their values
- Project Switch: switch project for all widgets in a dashboard
- Release: show release information which is loaded from server (**/dist/widget/releaseData.json**)
- Label: show a label, you can change its text

PS: with a little  enhancement, customized widget definitions can also be loaded from external source.



## 3. About design

This demo only supports single user, but can support multiple users with few changes.

Currently, all widget definitions are predefined and shipped with the demo (see **/src/persistence/SampleWidgets.ts**). However, with a little modifications, customized widget definitions can also be loaded from external source.

### Domain model

Four main concepts:

- Dashboard: a dashboard with id, name
- Def: Widget definition, used to create widget instance
- Widget: instance of widget, i.e. widget instance in a dashboard
- Field: each widget could have one or more fields, user can customize a widget via these fields.

### Widget

Each widget has 4 lifecycle hooks, similar with React:

- constructor
- didMount
- render: to support async call, it returns a Promise resolved with html element
- willUnmount

In addtion, there is a instance property named **props**.

- props: fields and their values are passed into this property after constructor is called. It's an object, with field name as key, and field value as value.

and the following methods are injected to widget instance to improve its capabilities:

- emitEvent: widget instance can call it to emit event, it need two parameters 
  - name: event name
  - data: event data

### UI

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
