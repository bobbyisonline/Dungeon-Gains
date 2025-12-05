import React from 'react';
import '../styles/sprites.css';

interface ItemSpriteProps {
  spriteSheet: string;
  spriteIndex: number;
  size?: 'small' | 'normal' | 'large';
  className?: string;
  onClick?: () => void;
}

export const ItemSprite: React.FC<ItemSpriteProps> = ({ 
  spriteSheet, 
  spriteIndex, 
  size = 'normal',
  className = '',
  onClick
}) => {
  const sizeClass = size === 'small' ? 'item-sprite-small' : size === 'large' ? 'item-sprite-large' : '';
  
  return (
    <div 
      className={`item-sprite sprite-${spriteSheet} sprite-pos-${spriteIndex} ${sizeClass} ${className}`}
      role="img"
      aria-label="Item sprite"
      onClick={onClick}
      style={onClick ? { cursor: 'pointer' } : undefined}
    />
  );
};

interface ItemIconProps {
  icon: string;
  spriteSheet?: string;
  spriteIndex?: number;
  size?: 'small' | 'normal' | 'large';
  className?: string;
  onClick?: () => void;
}

// Unified component that handles both emoji and sprite icons
export const ItemIcon: React.FC<ItemIconProps> = ({ 
  icon, 
  spriteSheet, 
  spriteIndex,
  size = 'normal',
  className = '',
  onClick
}) => {
  // If sprite data is provided, use sprite; otherwise use emoji
  if (spriteSheet !== undefined && spriteIndex !== undefined) {
    return <ItemSprite spriteSheet={spriteSheet} spriteIndex={spriteIndex} size={size} className={className} onClick={onClick} />;
  }
  
  // Fallback to emoji
  const fontSize = size === 'small' ? '1.5rem' : size === 'large' ? '3rem' : '2rem';
  return <span style={{ fontSize, cursor: onClick ? 'pointer' : undefined }} className={className} onClick={onClick}>{icon}</span>;
};
