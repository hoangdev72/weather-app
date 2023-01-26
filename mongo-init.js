db.log.insertOne({ message: 'Database created.' })

db.createUser({
  user: 'root',
  pwd: 'root',
  roles: ['readWrite', 'dbAdmin'],
})
