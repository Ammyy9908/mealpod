import React from 'react'

function VegIcon({ width = 24, height = 24, className = '' }) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      xmlSpace="preserve" 
      width={width} 
      height={height} 
      version="1.1" 
      viewBox="0 0 3387 3387"
      className={className}
      style={{
        shapeRendering: 'geometricPrecision',
        textRendering: 'geometricPrecision',
        imageRendering: 'optimizeQuality',
        fillRule: 'evenodd',
        clipRule: 'evenodd'
      }}
    >
      <g id="Layer_x0020_1">
        <rect 
          fill="#FEFEFE" 
          stroke="#008001" 
          strokeWidth="85" 
          x="338" 
          y="320" 
          width="2739" 
          height="2773"
        />
        <circle 
          fill="#008001" 
          stroke="#008001" 
          strokeWidth="85" 
          cx="1707" 
          cy="1733" 
          r="789"
        />
      </g>
    </svg>
  )
}

export default VegIcon