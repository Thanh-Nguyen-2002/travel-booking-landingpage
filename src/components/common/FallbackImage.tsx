import React, { useState } from 'react';
import { Image as ImageIcon } from 'lucide-react';

interface FallbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    fallbackText?: string;
    fallbackIcon?: React.ReactNode;
}

export const FallbackImage: React.FC<FallbackImageProps> = ({ 
    src, 
    alt, 
    className, 
    fallbackText,
    fallbackIcon,
    ...props 
}) => {
    const [hasError, setHasError] = useState(false);

    if (!src || hasError) {
        return (
            <div className={`flex flex-col items-center justify-center bg-slate-200 text-slate-400 ${className}`}>
                {fallbackIcon || <ImageIcon size={32} className="mb-2 opacity-50" />}
                {fallbackText && (
                    <span className="text-sm font-medium uppercase truncate max-w-[90%]">
                        {fallbackText}
                    </span>
                )}
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt}
            className={className}
            onError={() => setHasError(true)}
            {...props}
        />
    );
};
