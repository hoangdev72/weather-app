db.log.insertOne({ message: 'Database created.' })

db.createUser({
  user: 'root',
  pwd: 'root',
  roles: ['readWrite', 'dbAdmin'],
})

db.users.insert({
  email: 'admin@example.com',
  password: '$2a$10$Q8CZ8medCw6Yz0/b.mQ8zOeYFTHnKdBdDCsK3oEXTY5JzJmvEDSU2',
})
