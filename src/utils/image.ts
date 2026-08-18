/**
 * Utility to parse image URLs from backend string fields (which can be JSON array strings or comma-separated URLs).
 */
export const getImageUrls = (imagesString?: string): string[] => {
    if (!imagesString) return [];
    
    const trimmed = imagesString.trim();
    if (trimmed.startsWith('[')) {
        try {
            const parsed = JSON.parse(trimmed);
            if (Array.isArray(parsed)) {
                return parsed.map(s => String(s).trim()).filter(Boolean);
            }
        } catch (e) {
            console.error('Failed to parse images JSON string:', e);
        }
    }
    
    // Fallback: comma-separated string
    return trimmed.split(',').map(s => s.trim()).filter(Boolean);
};

/**
 * Gets the first valid image URL or a default fallback.
 */
export const getCoverImage = (imagesString?: string, defaultFallback = 'https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?q=80&w=800'): string => {
    const urls = getImageUrls(imagesString);
    return urls.length > 0 ? urls[0] : defaultFallback;
};
