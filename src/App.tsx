import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { MainLayout } from './layouts/MainLayout';

const queryClient = new QueryClient({
    defaultOptions: {
        queries: {
            refetchOnWindowFocus: false,
            retry: 1,
        },
    },
});

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { Home } from './features/home/Home';
import { DestinationsPage } from './features/destinations/DestinationsPage';
import { HotelsPage } from './features/hotels/HotelsPage';
import { PackagesPage } from './features/packages/PackagesPage';
import { AboutPage } from './features/pages/AboutPage';
import { ContactPage } from './features/pages/ContactPage';
import { TermsPage } from './features/pages/TermsPage';
import { PrivacyPage } from './features/pages/PrivacyPage';
import { LoginPage } from './features/auth/LoginPage';
import { ScrollToTop } from './components/common/ScrollToTop';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <ScrollToTop />
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="destinations" element={<DestinationsPage />} />
                        <Route path="hotels" element={<HotelsPage />} />
                        <Route path="packages" element={<PackagesPage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="terms" element={<TermsPage />} />
                        <Route path="privacy" element={<PrivacyPage />} />
                        <Route path="login" element={<LoginPage />} />
                        {/* More routes will go here */}
                    </Route>
                </Routes>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
    );
}

export default App;
