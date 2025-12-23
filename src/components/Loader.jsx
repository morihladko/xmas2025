import { useProgress } from '@react-three/drei'
import { useEffect, useState } from 'react'

function Loader() {
  const { progress, active } = useProgress()
  const [visible, setVisible] = useState(true)

  // Hide loader after loading completes with a small delay
  useEffect(() => {
    if (progress === 100 && !active) {
      const timer = setTimeout(() => setVisible(false), 500)
      return () => clearTimeout(timer)
    }
  }, [progress, active])

  if (!visible) return null

  // Calculate which segments to draw based on progress
  // Each side is 25% of total progress
  // Order: top (0-25%), right (25-50%), bottom (50-75%), left (75-100%)
  const size = 120
  const strokeWidth = 3
  const halfStroke = strokeWidth / 2

  // Calculate dash arrays for each side
  const sideLength = size - strokeWidth

  const getSegmentProgress = (segmentStart, segmentEnd) => {
    if (progress <= segmentStart) return 0
    if (progress >= segmentEnd) return 100
    return ((progress - segmentStart) / (segmentEnd - segmentStart)) * 100
  }

  const topProgress = getSegmentProgress(0, 25)
  const rightProgress = getSegmentProgress(25, 50)
  const bottomProgress = getSegmentProgress(50, 75)
  const leftProgress = getSegmentProgress(75, 100)

  return (
    <div style={{
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100%',
      height: '100%',
      display: 'flex',
      flexDirection: 'column',
      alignItems: 'center',
      justifyContent: 'center',
      background: 'linear-gradient(180deg, #0a1628 0%, #1a2a4a 100%)',
      zIndex: 1000,
      transition: 'opacity 0.5s ease-out',
      opacity: progress === 100 ? 0 : 1,
    }}>
      <div style={{
        position: 'relative',
        width: size,
        height: size,
      }}>
        <svg
          width={size}
          height={size}
          style={{ position: 'absolute', top: 0, left: 0 }}
        >
          {/* Top edge - left to right */}
          <line
            x1={halfStroke}
            y1={halfStroke}
            x2={size - halfStroke}
            y2={halfStroke}
            stroke="#ffffff"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={sideLength}
            strokeDashoffset={sideLength - (sideLength * topProgress / 100)}
            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
          />

          {/* Right edge - top to bottom */}
          <line
            x1={size - halfStroke}
            y1={halfStroke}
            x2={size - halfStroke}
            y2={size - halfStroke}
            stroke="#ffffff"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={sideLength}
            strokeDashoffset={sideLength - (sideLength * rightProgress / 100)}
            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
          />

          {/* Bottom edge - right to left */}
          <line
            x1={size - halfStroke}
            y1={size - halfStroke}
            x2={halfStroke}
            y2={size - halfStroke}
            stroke="#ffffff"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={sideLength}
            strokeDashoffset={sideLength - (sideLength * bottomProgress / 100)}
            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
          />

          {/* Left edge - bottom to top */}
          <line
            x1={halfStroke}
            y1={size - halfStroke}
            x2={halfStroke}
            y2={halfStroke}
            stroke="#ffffff"
            strokeWidth={strokeWidth}
            strokeLinecap="round"
            strokeDasharray={sideLength}
            strokeDashoffset={sideLength - (sideLength * leftProgress / 100)}
            style={{ transition: 'stroke-dashoffset 0.1s ease-out' }}
          />
        </svg>

        {/* Progress percentage in center */}
        <div style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          color: '#ffffff',
          fontFamily: 'monospace',
          fontSize: '14px',
          opacity: 0.8,
        }}>
          {Math.round(progress)}%
        </div>
      </div>
    </div>
  )
}

export default Loader
