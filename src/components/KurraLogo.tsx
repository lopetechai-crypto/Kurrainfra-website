import React from 'react';

interface KurraLogoProps {
  className?: string;
  showText?: boolean;
  size?: 'sm' | 'md' | 'lg';
}

export const KurraLogo: React.FC<KurraLogoProps> = ({
  className = '',
  showText = true,
  size = 'md',
}) => {
  const iconSizes = {
    sm: 'w-6 h-6',
    md: 'w-8 h-8',
    lg: 'w-12 h-12',
  };

  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {/* Official Geometric Architectural 'K' Monogram SVG */}
      <svg
        viewBox="0 0 100 120"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className={`${iconSizes[size]} text-[#c8a97e] shrink-0`}
      >
        {/* Tower Stem with Hatch Patterns */}
        <path
          d="M25 15 H40 V105 H25 Z"
          fill="currentColor"
        />
        {/* Striped skyscraper lines in left stem */}
        <path
          d="M27 25 L38 20 M27 35 L38 30 M27 45 L38 40 M27 55 L38 50 M27 65 L38 60 M27 75 L38 70 M27 85 L38 80 M27 95 L38 90"
          stroke="#090a0c"
          strokeWidth="2.5"
        />
        {/* Top Diagonal Arm of K */}
        <path
          d="M40 55 L75 20 H90 L52 60 Z"
          fill="currentColor"
        />
        {/* Bottom Diagonal Arm of K */}
        <path
          d="M40 65 L88 105 H72 L40 78 Z"
          fill="currentColor"
        />
        {/* Outer Architectural Contour Line */}
        <path
          d="M20 10 H45 L95 20 L52 65 L92 108 H68 L38 82 V108 H20 Z"
          stroke="currentColor"
          strokeWidth="2"
          fill="none"
          opacity="0.3"
        />
      </svg>

      {showText && (
        <div className="flex flex-col">
          <span className="font-display text-base md:text-lg font-normal tracking-[0.18em] text-[#f4f2ec] uppercase leading-none">
            KURRA INFRA
          </span>
          <span className="font-sans text-[8px] tracking-[0.3em] text-[#a3a8b2] uppercase mt-1">
            ARCHITECTURE & DEVELOPMENTS
          </span>
        </div>
      )}
    </div>
  );
};
