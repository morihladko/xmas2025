import { useProgress } from '@react-three/drei'
import { useEffect, useState, useRef } from 'react'
import { t } from '../i18n'

const audioPathWebm = `${import.meta.env.BASE_URL}podmaz.webm`
const audioPathAac = `${import.meta.env.BASE_URL}podmaz.m4a`

function Loader() {
  const { progress, active } = useProgress()
  const [phase, setPhase] = useState('loading')
  const [audioLoaded, setAudioLoaded] = useState(false)
  const [fontLoaded, setFontLoaded] = useState(false)
  const audioRef = useRef(null)

  // Preload font
  useEffect(() => {
    document.fonts.load('1em "Fascinate Inline"').then(() => {
      setFontLoaded(true)
    }).catch(() => {
      setFontLoaded(true)
    })
  }, [])

  // Preload audio
  useEffect(() => {
    const audio = new Audio()

    // Detect iOS (iPhone/iPod only, iPad uses desktop Safari with WebM support)
    const isIOS = /iPhone|iPod/.test(navigator.userAgent)
    const canPlayWebm = audio.canPlayType('audio/webm')

    let audioPath
    if (isIOS) {
      audioPath = audioPathAac
    } else if (canPlayWebm === 'probably' || canPlayWebm === 'maybe') {
      audioPath = audioPathWebm
    } else {
      setAudioLoaded(true)
      return
    }

    audio.src = audioPath
    audio.loop = true
    audio.preload = 'auto'

    audio.addEventListener('canplaythrough', () => {
      setAudioLoaded(true)
    })

    audio.addEventListener('error', () => {
      setAudioLoaded(true)
    })

    // Fallback timeout
    const timeout = setTimeout(() => {
      setAudioLoaded(true)
    }, 5000)

    audioRef.current = audio

    return () => {
      clearTimeout(timeout)
      audio.pause()
      audio.src = ''
    }
  }, [])

  // Transition to ready state when assets, audio, and font are loaded
  useEffect(() => {
    if (progress === 100 && !active && audioLoaded && fontLoaded) {
      const timer = setTimeout(() => setPhase('ready'), 500)
      return () => clearTimeout(timer)
    }
  }, [progress, active, audioLoaded, fontLoaded])

  const handlePlay = () => {
    if (audioRef.current) {
      audioRef.current.play()
      setPhase('playing')
    }
  }

  if (phase === 'playing') return null

  const size = 120
  const strokeWidth = 3
  const halfStroke = strokeWidth / 2
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

  const isLoading = phase === 'loading'

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
      background: isLoading
        ? 'linear-gradient(180deg, #0a1628 0%, #1a2a4a 100%)'
        : 'rgba(0, 0, 0, 0.3)',
      backdropFilter: isLoading ? 'none' : 'blur(10px)',
      zIndex: 1000,
      transition: 'background 0.5s ease-out, backdrop-filter 0.5s ease-out',
    }}>
      {isLoading ? (
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
      ) : (
        <button
          onClick={handlePlay}
          style={{
            padding: '20px 60px',
            fontSize: '24px',
            fontFamily: 'monospace',
            background: 'rgba(255, 255, 255, 0.15)',
            backdropFilter: 'blur(10px)',
            border: '2px solid rgba(255, 255, 255, 0.5)',
            borderRadius: '12px',
            color: '#ffffff',
            cursor: 'pointer',
            transition: 'all 0.2s ease',
          }}
          onMouseOver={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.25)'
            e.target.style.transform = 'scale(1.05)'
          }}
          onMouseOut={(e) => {
            e.target.style.background = 'rgba(255, 255, 255, 0.15)'
            e.target.style.transform = 'scale(1)'
          }}
        >
          {t('play')}
        </button>
      )}
    </div>
  )
}

export default Loader
