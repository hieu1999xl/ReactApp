import authRoutes from '../modules/auth/routes'
import myPointRoutes from '../modules/myPoint/routes'

const routes = [...authRoutes, ...myPointRoutes]

export default routes
