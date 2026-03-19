import { useState, useEffect } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import './ClickRipple.css'

function ClickRipple() {
  const [ripples, setRipples] = useState([])

  useEffect(() => {
    let rippleId = 0

    const handleClick = (e) => {
      const ripple = {
        id: rippleId++,
        x: e.clientX,
        y: e.clientY,
      }

      setRipples((prev) => [...prev, ripple])

      setTimeout(() => {
        setRipples((prev) => prev.filter((r) => r.id !== ripple.id))
      }, 1000)
    }

    window.addEventListener('click', handleClick)

    return () => {
      window.removeEventListener('click', handleClick)
    }
  }, [])

  return (
    <div className="click-ripple-container">
      <AnimatePresence>
        {ripples.map((ripple) => (
          <motion.div
            key={ripple.id}
            className="ripple"
            initial={{
              x: ripple.x,
              y: ripple.y,
              scale: 0,
              opacity: 1,
            }}
            animate={{
              scale: 3,
              opacity: 0,
            }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        ))}
      </AnimatePresence>
    </div>
  )
}

export default ClickRipple