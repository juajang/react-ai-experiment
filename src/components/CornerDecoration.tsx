import React from 'react';

type Position = 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';

interface CornerDecorationProps {
  position: Position;
}

const CornerDecoration: React.FC<CornerDecorationProps> = ({ position }) => {
  const isTop = position.includes('top');
  const isLeft = position.includes('left');

  return (
    <div
      style={{
        position: 'absolute',
        [isTop ? 'top' : 'bottom']: '15px',
        [isLeft ? 'left' : 'right']: '15px',
        width: '40px',
        height: '40px',
        borderTop: isTop ? '3px solid #c9a227' : 'none',
        borderBottom: !isTop ? '3px solid #c9a227' : 'none',
        borderLeft: isLeft ? '3px solid #c9a227' : 'none',
        borderRight: !isLeft ? '3px solid #c9a227' : 'none'
      }}
    />
  );
};

export default CornerDecoration;

