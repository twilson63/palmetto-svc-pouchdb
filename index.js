var PouchDB = require('pouchdb')
var Response = require('palmettoflow-event').Response
var Response = require('palmettoflow-event').ResponseError

var pluralize = require('pluralize')
var xtend = require('xtend')

module.exports = function (dbName, docType, ee) {
  var db = PouchDB(dbName)
  var model = '/' + pluralize(docType)

  // all docs
  ee.on('/docs/all', function (e) {
    var opts = xtend(e.object, { include_docs: true })
    var send = sendResponse(e)
    db.allDocs(opts)
      .then(function (res) {
        send(pluck('doc', res.rows))
      })
      .catch(sendError(e))
  })

  // list all docs by type
  ee.on(model + '/list', function (e) {
    var opts = xtend(e.object, { include_docs: true })
    var send = sendResponse(e)
    db.query(byType, opts)
      .then(function (res) {
        send(pluck('doc', res.rows))
      })
      .catch(sendError(e))
  })

  // call custom queries or views
  ee.on(model + '/query', function (e) {
    var opts = xtend(e.object.options, { include_docs: true })
    db.query(e.object.query, opts)
      .then(sendResponse(e))
      .catch(sendError(e))
  })

  // changes feed
  ee.on(model + '/changes', function (e) {
    var opts = xtend(e, { include_docs: true })
    var send = sendResponse(e)
    db.changes(opts)
      .on('change', function (chg) {
        if (chg.doc.type === docType) {
          send(chg.doc)
        }
      })
  })

  // basic events
  ['get', 'create', 'update', 'remove']
    .forEach(function (verb) {
      ee.on([model, verb].join('/'), dbExec)
    })

  // list query
  function byType (doc) {
    if (doc.type === docType) {
      emit(doc._id)
    }
  }

  // pluck
  function pluck (node, list) {
    list.map(function (item) {
      return item[node]
    })
  }

  // core db methods
  function dbExec (e) {
    db[e.verb](e.object)
      .then(sendResponse(e))
      .catch(sendError(e))
  }

  // handlers
  function sendResponse (e) {
    return function (obj) {
      ee.emit('send', Response(e, obj))
    }
  }

  function sendError (e) {
    return function (err) {
      ee.emit('send', ResponseError(e, err))
    }
  }

}
