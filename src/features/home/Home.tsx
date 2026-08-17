import React from 'react';
import { HeroBanner } from './components/HeroBanner';
import { SearchForm } from './components/SearchForm';
import { DestinationsSection } from './components/DestinationsSection';
import { HotelsSection } from './components/HotelsSection';
import { BlogsSection } from './components/BlogsSection';

export const Home: React.FC = () => {
    return (
        <div className="bg-white">
            <HeroBanner />
            <SearchForm />
            <DestinationsSection />
            <HotelsSection />
            <BlogsSection />
        </div>
    );
};
