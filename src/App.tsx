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

const HomePlaceholder = () => (
    <div className="flex items-center justify-center h-64 text-2xl font-semibold text-slate-400">
        Home Page Content
    </div>
);

function App() {
    return (
        <QueryClientProvider client={queryClient}>
            <Router>
                <Routes>
                    <Route path="/" element={<MainLayout />}>
                        <Route index element={<HomePlaceholder />} />
                        {/* More routes will go here */}
                    </Route>
                </Routes>
            </Router>
        </QueryClientProvider>
    );
}

export default App;
