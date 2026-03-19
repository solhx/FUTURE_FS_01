import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './CursorTrail.css'

function CursorTrail() {
  const [particles, setParticles] = useState([])

  useEffect(() => {
    let particleId = 0

    const createParticle = (x, y) => {
      const particle = {
        id: particleId++,
        x,
        y,
        size: Math.random() * 8 + 4,
        color: `hsl(${Math.random() * 60 + 180}, 70%, 60%)`,
      }

      setParticles((prev) => [...prev.slice(-20), particle])
    }

    const handleMouseMove = (e) => {
      if (Math.random() > 0.7) {
        createParticle(e.clientX, e.clientY)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
    }
  }, [])

  return (
    <div className="cursor-trail-container">
      <AnimatePresence>
        {particles.map((particle) => (
          <motion.div
            key={particle.id}
            className="trail-particle"
            initial={{
              x: particle.x,
              y: particle.y,
              scale: 1,
              opacity: 1,
            }}
            animate={{
              y: particle.y - 50,
              scale: 0,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 1, ease: 'easeOut' }}
            style={{
              width: particle.size,
              height: particle.size,
              backgroundColor: particle.color,
              boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
            }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default CursorTrail