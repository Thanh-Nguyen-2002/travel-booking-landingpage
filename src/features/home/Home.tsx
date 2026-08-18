import React from 'react';
import { HeroBanner } from './components/HeroBanner';
import { DestinationsSection } from './components/DestinationsSection';
import { HotelsSection } from './components/HotelsSection';
import { PackagesSection } from './components/PackagesSection';
import { FeedbackSection } from './components/FeedbackSection';
import { BlogsSection } from './components/BlogsSection';

export const Home: React.FC = () => {
    return (
        <div className="bg-white">
            <HeroBanner />
            <DestinationsSection />
            <PackagesSection />
            <HotelsSection />
            <FeedbackSection />
            <BlogsSection />
        </div>
    );
};
