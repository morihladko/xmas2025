import { Canvas } from '@react-three/fiber'
import { Suspense } from 'react'
import Scene from './components/Scene'
import Loader from './components/Loader'
import { t } from './i18n'

// Set document title from i18n
document.title = t('title')

function FestiveText() {
  return (
    <div style={{
      position: 'fixed',
      top: '10%',
      left: 0,
      right: 0,
      display: 'flex',
      justifyContent: 'center',
      pointerEvents: 'none',
      zIndex: 100,
      paddingLeft: '1em',
      paddingRight: '1em',
      paddingTop: '1em',
    }}>
      <h1 style={{
        fontSize: 'clamp(2rem, 8vw, 5rem)',
        fontFamily: "'Fascinate Inline', cursive",
        fontWeight: 400,
        color: '#fff',
        textAlign: 'center',
        margin: 0,
        padding: '0 20px',
        letterSpacing: '0.02em',
        lineHeight: 1.2,
        WebkitTextStroke: '1px #000',
        textShadow: '2px 2px 4px rgba(0,0,0,0.5)',
      }}>
        {t('greeting').split('\n').map((line, i, arr) => (
          <span key={i}>
            {line}
            {i < arr.length - 1 && <br />}
          </span>
        ))}
      </h1>
    </div>
  )
}

function App() {
  return (
    <>
      <Loader />
      <FestiveText />
      <Canvas
        shadows
        camera={{
          position: [0, 8, 32],
          fov: 35,
          near: 0.1,
          far: 1000
        }}
        gl={{ antialias: true }}
      >
        <Suspense fallback={null}>
          <Scene />
        </Suspense>
      </Canvas>
    </>
  )
}

export default App
