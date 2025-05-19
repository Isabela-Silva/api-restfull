import { Router } from 'express'

import { productsRoutes } from './products-routes'
import { coursesRoutes } from './courses-routes'

const routes = Router()

routes.use("/products", productsRoutes)
routes.use("/courses", coursesRoutes)

export { routes }