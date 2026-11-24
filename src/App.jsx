import { useRoute, match } from './lib/router'
import { StoreProvider } from './context/StoreContext'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import CartDrawer from './components/CartDrawer'
import Toasts from './components/Toasts'
import Home from './pages/Home'
import Shop from './pages/Shop'
import ProductDetails from './pages/ProductDetails'
import Cart from './pages/Cart'
import Checkout from './pages/Checkout'
import OrderSuccess from './pages/OrderSuccess'
import Wishlist from './pages/Wishlist'
import Account from './pages/Account'
import About from './pages/About'
import Contact from './pages/Contact'
import StyleGuide from './pages/StyleGuide'
import NotFound from './pages/NotFound'

// The 10 store pages (+ design system & 404)
function Page({ path, query }) {
  let m
  if (path === '/') return <Home />
  if (path === '/shop') return <Shop query={query} />
  if ((m = match('/product/:slug', path))) return <ProductDetails key={m.slug} slug={m.slug} />
  if (path === '/cart') return <Cart />
  if (path === '/checkout') return <Checkout />
  if ((m = match('/order/:id', path))) return <OrderSuccess id={m.id} />
  if (path === '/wishlist') return <Wishlist />
  if (path === '/account') return <Account />
  if (path === '/about') return <About />
  if (path === '/contact') return <Contact query={query} />
  if (path === '/style-guide') return <StyleGuide />
  return <NotFound />
}

export default function App() {
  const { path, query } = useRoute()
  return (
    <StoreProvider>
      <Navbar path={path} />
      <main key={path} className="min-h-[60vh] animate-fade-in">
        <Page path={path} query={query} />
      </main>
      <Footer />
      <CartDrawer />
      <Toasts />
    </StoreProvider>
  )
}
