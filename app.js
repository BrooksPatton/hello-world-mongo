const express = require('express')
const app = express()
const monk = require('monk')
const bodyParser = require('body-parser')

const mainDB = monk('localhost/hello-world')
const myCollection = mainDB.get('my-collection')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.post('/', (req, res, next) => {
	console.log('creating')
	myCollection.insert(req.body)
	.then(result => res.json(result))
	.catch(err => next(err))
})

app.get('/', (req, res, next) => {
	console.log('getting all')
	myCollection.find()
	.then(results => res.json(results))
	.catch(err => next(err))
})

app.get('/:id', (req, res, next) => {
	console.log('getting one')
	myCollection.find({_id: req.params.id})
	.then(result => res.json(result))
	.catch(err => next(err))
})

app.put('/:id', (req, res, next) => {
	console.log('updating')
	myCollection.update({_id: req.params.id}, req.body)
	.then(result => res.json(result))
	.catch(err => next(err))
})

app.delete('/:id', (req, res, next) => {
	console.log('deleting')
	myCollection.remove({_id: req.params.id})
	.then(result => res.json(result))
	.catch(err => next(err))
})

app.listen(3000, () => console.log('server started on port 3000'))
