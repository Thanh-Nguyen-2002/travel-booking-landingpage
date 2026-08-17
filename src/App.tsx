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
import { HotelDetailPage } from './features/hotels/HotelDetailPage';
import { PackagesPage } from './features/packages/PackagesPage';
import { AboutPage } from './features/pages/AboutPage';
import { ContactPage } from './features/pages/ContactPage';
import { TermsPage } from './features/pages/TermsPage';
import { PrivacyPage } from './features/pages/PrivacyPage';
import { PromotionsPage } from './features/pages/PromotionsPage';
import { LoginPage } from './features/auth/LoginPage';
import { RegisterPage } from './features/auth/RegisterPage';
import { CheckoutPage } from './features/booking/CheckoutPage';
import { ScrollToTop } from './components/common/ScrollToTop';
import { Toaster } from 'sonner';

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <ScrollToTop />
                <Toaster visibleToasts={3} position="top-right" richColors />
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<Home />} />
                        <Route path="destinations" element={<DestinationsPage />} />
                        <Route path="hotels" element={<HotelsPage />} />
                        <Route path="hotels/:id" element={<HotelDetailPage />} />
                        <Route path="packages" element={<PackagesPage />} />
                        <Route path="promotions" element={<PromotionsPage />} />
                        <Route path="about" element={<AboutPage />} />
                        <Route path="contact" element={<ContactPage />} />
                        <Route path="terms" element={<TermsPage />} />
                        <Route path="privacy" element={<PrivacyPage />} />
                        <Route path="login" element={<LoginPage />} />
                        <Route path="register" element={<RegisterPage />} />
                        <Route path="checkout" element={<CheckoutPage />} />
                        {/* More routes will go here */}
                    </Route>
                </Routes>
            </Router>
            <ReactQueryDevtools initialIsOpen={false} position="bottom" />
        </QueryClientProvider>
    );
}

export default App;
