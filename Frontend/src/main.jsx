import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import { Toaster } from '@/components/ui/sonner'
import store from './Redux/store'
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import persistStore from 'redux-persist/es/persistStore'
import ScrollToTop from './components/ScrollToTop'
let persistor = persistStore(store)
createRoot(document.getElementById('root')).render(
<BrowserRouter>
<ScrollToTop />
<Provider store={store}>
    <PersistGate loading={null} persistor={persistor}>
<App />
<Toaster />
    </PersistGate>
</Provider>
</BrowserRouter>
)
