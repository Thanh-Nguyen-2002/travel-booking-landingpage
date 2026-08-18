import React, { useState } from 'react';
import { User, Image as ImageIcon } from 'lucide-react';

interface FeedbackImageProps extends React.ImgHTMLAttributes<HTMLImageElement> {
    src?: string;
    alt?: string;
    type?: 'avatar' | 'photo';
    name?: string; // Used to generate initials for avatar fallbacks
    className?: string;
}

// Helper to get deterministic gradient based on name
const getAvatarGradient = (name = '') => {
    const gradients = [
        'from-blue-500 to-indigo-600',
        'from-emerald-400 to-teal-600',
        'from-amber-400 to-orange-500',
        'from-rose-400 to-pink-600',
        'from-violet-500 to-purple-600',
        'from-sky-400 to-cyan-500'
    ];
    if (!name) return gradients[0];
    let sum = 0;
    for (let i = 0; i < name.length; i++) {
        sum += name.charCodeAt(i);
    }
    return gradients[sum % gradients.length];
};

// Helper to get initials
const getInitials = (name = '') => {
    if (!name) return '';
    const parts = name.trim().split(' ');
    if (parts.length === 1) return parts[0].charAt(0).toUpperCase();
    return (parts[0].charAt(0) + parts[parts.length - 1].charAt(0)).toUpperCase();
};

export const FeedbackImage: React.FC<FeedbackImageProps> = ({
    src,
    alt = '',
    type = 'avatar',
    name = '',
    className = '',
    ...props
}) => {
    const [hasError, setHasError] = useState(false);

    const handleError = () => {
        setHasError(true);
    };

    const isFallback = !src || hasError;

    if (isFallback) {
        if (type === 'avatar') {
            const initials = getInitials(name);
            const gradient = getAvatarGradient(name);
            return (
                <div 
                    className={`flex items-center justify-center rounded-full text-white font-bold bg-gradient-to-br ${gradient} select-none shadow-inner ${className}`}
                    title={name || alt}
                >
                    {initials ? (
                        <span className="text-sm tracking-wider">{initials}</span>
                    ) : (
                        <User size={18} className="opacity-80" />
                    )}
                </div>
            );
        }

        // Photo Mode Fallback
        return (
            <div className={`flex flex-col items-center justify-center bg-gradient-to-br from-slate-100 to-slate-200 border border-slate-200/60 text-slate-400 rounded-xl ${className}`}>
                <ImageIcon size={24} className="mb-1.5 opacity-60 text-slate-400" />
                <span className="text-xs font-semibold text-slate-500 uppercase tracking-wider">No Photo</span>
            </div>
        );
    }

    return (
        <img
            src={src}
            alt={alt || name}
            onError={handleError}
            className={`object-cover ${className}`}
            {...props}
        />
    );
};
