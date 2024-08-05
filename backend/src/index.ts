import "reflect-metadata"
import {connectDB} from './dataSource'
import app from "./app"

const startServer = async () => {
  await connectDB()

  app.listen(3001, () => {
    console.log('Server is running on http://localhost:3001');
  })
}

startServer();