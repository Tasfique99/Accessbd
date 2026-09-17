import { lazy, Suspense } from 'react'
import { BrowserRouter, Navigate, Route, Routes } from 'react-router-dom'
import { AppProviders } from './context/AppProviders'
import { Layout, PageLoader } from './components/chrome'

const Home = lazy(() => import('./pages/Home'))
const Scan = lazy(() => import('./pages/Scan'))
const DocumentPage = lazy(() => import('./pages/Document'))
const Ask = lazy(() => import('./pages/Ask'))
const History = lazy(() => import('./pages/History'))
const Settings = lazy(() => import('./pages/Settings'))
const About = lazy(() => import('./pages/About'))

export default function App() {
  return (
    <AppProviders>
      <BrowserRouter>
        <Layout>
          <Suspense fallback={<PageLoader />}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/scan" element={<Scan />} />
              <Route path="/document" element={<DocumentPage />} />
              <Route path="/ask" element={<Ask />} />
              <Route path="/history" element={<History />} />
              <Route path="/settings" element={<Settings />} />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<Navigate to="/" replace />} />
            </Routes>
          </Suspense>
        </Layout>
      </BrowserRouter>
    </AppProviders>
  )
}
