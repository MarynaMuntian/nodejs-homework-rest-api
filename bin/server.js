const mongoose = require('mongoose')
const app = require('../app')

const PORT = process.env.PORT || 3000

mongoose.connect(process.env.DB_HOST)
  .then(() => {
    app.listen(PORT, () => {
      console.log('Database connection successful')
})
  })
  .catch(error => {
    console.log(error.message)
    process.exit(1)
})
