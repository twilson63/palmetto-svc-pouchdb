# PalmettoFlow PouchDB Model Service

This module provides a pouchdb model service for any
palmettoflow application.

PouchDB can be used to connect with a pouchdb database or a couchdb database.

So this module can run in a service in nodejs or in the browser.

## Install

```
npm install palmetto-svc-pouchdb -S
```

## Usage

Start the Service

```
var palmetto = require('palmetto-nodejs')
var ee = palmetto()
var svc = require('palmetto-svc-pouchdb')

// start projects service
svc('app-username', 'project', ee)
```

Events Supported

Get All Documents in the database

```
var newEvent = require('palmettoflow-event').newEvent
var ne = newEvent('docs', 'all', {}, {
  // actor info here
})

var l = ee.on(ne.from, function (e) {
  // do stuff with docs (e.object)
  ee.removeListener(l)  
})

ee.emit('send', ne)

```

Get Documents of specific type

```
var newEvent = require('palmettoflow-event').newEvent
var ne = newEvent('projects', 'list', {}, {
  // actor info here
})

var l = ee.on(ne.from, function (e) {
  // do stuff with docs (e.object)
  ee.removeListener(l)  
})

ee.emit('send', ne)

```


Get Changes Feed

```
var newEvent = require('palmettoflow-event').newEvent
var ne = newEvent('projects', 'changes', {
  live: true,
  since: 'now'
  }, {
  // actor info here
})

var l = ee.on(ne.from, function (e) {
  // do stuff with docs (e.object)
  // this will continue for every change for specific docType  
})

ee.emit('send', ne)

```


Get Custom query

```
var newEvent = require('palmettoflow-event').newEvent
var ne = newEvent('projects', 'query', {
  options: {},
  query: function (doc) { emit(doc._id) }
}, {
  // actor info here
})

var l = ee.on(ne.from, function (e) {
  // custom view
})

ee.emit('send', ne)
```

Get Single Document


```
var newEvent = require('palmettoflow-event').newEvent
var ne = newEvent('projects', 'get', "12345", {
  // actor info here
})

var l = ee.on(ne.from, function (e) {
  // get doc
  console.log(e.object)
})

ee.emit('send', ne)
```

Create Document

```
var newEvent = require('palmettoflow-event').newEvent
var ne = newEvent('projects', 'create', {...}, {
  // actor info here
})

var l = ee.on(ne.from, function (e) {
  // get response
  console.log(e.object)
})

ee.emit('send', ne)
```

Update Document

```
var newEvent = require('palmettoflow-event').newEvent
var ne = newEvent('projects', 'update', {...}, {
  // actor info here
})

var l = ee.on(ne.from, function (e) {
  // get response
  console.log(e.object)
})

ee.emit('send', ne)
```


Remove Document

```
var newEvent = require('palmettoflow-event').newEvent
var ne = newEvent('projects', 'remove', {...}, {
  // actor info here
})

var l = ee.on(ne.from, function (e) {
  // get response
  console.log(e.object)
})

ee.emit('send', ne)
```



## FAQ

## Support

## How to contribute

## License

MIT
