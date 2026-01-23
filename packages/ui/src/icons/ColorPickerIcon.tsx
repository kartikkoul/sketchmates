import React from 'react';

const ColorPickerIcon = ({
  size = undefined,
  color = '#000000',
  strokeWidth = 2,
  background = 'transparent',
  opacity = 1,
  rotation = 0,
  shadow = 0,
  flipHorizontal = false,
  flipVertical = false,
  padding = 0
}) => {
  const transforms = [];
  if (rotation !== 0) transforms.push(`rotate(${rotation}deg)`);
  if (flipHorizontal) transforms.push('scaleX(-1)');
  if (flipVertical) transforms.push('scaleY(-1)');

  const viewBoxSize = 24 + (padding * 2);
  const viewBoxOffset = -padding;
  const viewBox = `${viewBoxOffset} ${viewBoxOffset} ${viewBoxSize} ${viewBoxSize}`;

  return (
    <svg
      xmlns="http://www.w3.org/2000/svg"
      viewBox={viewBox}
      width={size}
      height={size}
      fill="none"
      stroke={color}
      strokeWidth={strokeWidth}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{
        opacity,
        transform: transforms.join(' ') || undefined,
        filter: shadow > 0 ? `drop-shadow(0 ${shadow}px ${shadow * 2}px rgba(0,0,0,0.3))` : undefined,
        backgroundColor: background !== 'transparent' ? background : undefined
      }}
    >
      <g fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth={strokeWidth}><path d="m16.527 11.46l-7.994 7.964a1.87 1.87 0 0 1-2.303.262l-1.235 1.229a1.114 1.114 0 0 1-1.591 0l-.319-.347a1.116 1.116 0 0 1 0-1.595l1.217-1.22a1.88 1.88 0 0 1 .262-2.316l7.947-7.964z"/><path d="M18.792 11.797a1.41 1.41 0 0 1-1.985 0l-4.68-4.643a1.418 1.418 0 0 1 .455-2.296a1.39 1.39 0 0 1 1.53.308l.57.562l1.845-2.223a2.805 2.805 0 0 1 3.9.07a2.82 2.82 0 0 1 .068 3.907L18.23 9.237l.562.572a1.397 1.397 0 0 1 0 1.988"/></g>
    </svg>
  );
};

export default ColorPickerIcon;