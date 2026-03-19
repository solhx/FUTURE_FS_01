import { useEffect, useRef, useState } from 'react'
import { motion, useMotionValue, useSpring } from 'framer-motion'
import './CustomCursor.css'

function CustomCursor() {
  const cursorRef = useRef(null)
  const [cursorVariant, setCursorVariant] = useState('default')
  const [isVisible, setIsVisible] = useState(true)

  const cursorX = useMotionValue(-100)
  const cursorY = useMotionValue(-100)

  const springConfig = { damping: 25, stiffness: 200, mass: 0.5 }
  const cursorXSpring = useSpring(cursorX, springConfig)
  const cursorYSpring = useSpring(cursorY, springConfig)

  useEffect(() => {
    const moveCursor = (e) => {
      cursorX.set(e.clientX)
      cursorY.set(e.clientY)
    }

    const handleMouseEnter = () => setIsVisible(true)
    const handleMouseLeave = () => setIsVisible(false)

    // Check if element is hoverable
    const isHoverable = (element) => {
      if (!element) return false
      
      // Check element itself
      if (
        element.tagName === 'BUTTON' ||
        element.tagName === 'A' ||
        element.tagName === 'INPUT' ||
        element.tagName === 'TEXTAREA'
      ) return true

      // Check classes
      const hoverClasses = [
        'project-card',
        'cta-button',
        'stat',
        'info-card',
        'skill-item',
        'contact-method',
        'modal-close',
        'btn-primary',
        'btn-secondary',
        'project-link',
        'tech-tag'
      ]

      return hoverClasses.some(cls => element.classList.contains(cls))
    }

    // Use event delegation for hover detection
    const handleMouseOver = (e) => {
      const target = e.target
      
      // Check if hovering over canvas
      if (target.tagName === 'CANVAS') {
        setCursorVariant('sphere')
        return
      }

      // Check if current element or any parent is hoverable
      let element = target
      while (element && element !== document.body) {
        if (isHoverable(element)) {
          setCursorVariant('hover')
          return
        }
        element = element.parentElement
      }

      // Default
      setCursorVariant('default')
    }

    window.addEventListener('mousemove', moveCursor)
    document.addEventListener('mouseenter', handleMouseEnter)
    document.addEventListener('mouseleave', handleMouseLeave)
    document.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      document.removeEventListener('mouseenter', handleMouseEnter)
      document.removeEventListener('mouseleave', handleMouseLeave)
      document.removeEventListener('mouseover', handleMouseLeave)
    }
  }, [cursorX, cursorY])

  const variants = {
    default: {
      width: 32,
      height: 32,
      backgroundColor: 'rgba(52, 152, 219, 0.5)',
      border: '2px solid rgba(52, 152, 219, 1)',
      mixBlendMode: 'difference',
    },
    hover: {
      width: 64,
      height: 64,
      backgroundColor: 'rgba(52, 152, 219, 0.2)',
      border: '2px solid rgba(52, 152, 219, 1)',
      mixBlendMode: 'difference',
    },
    sphere: {
      width: 80,
      height: 80,
      backgroundColor: 'rgba(52, 152, 219, 0.1)',
      border: '3px solid rgba(52, 152, 219, 1)',
      mixBlendMode: 'difference',
    },
  }

  return (
    <>
      {/* Main Cursor */}
      <motion.div
        ref={cursorRef}
        className="custom-cursor"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        animate={cursorVariant}
        variants={variants}
        transition={{ type: 'spring', stiffness: 500, damping: 28 }}
      />

      {/* Cursor Dot */}
      <motion.div
        className="cursor-dot"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
      />

      {/* Cursor Trail */}
      <motion.div
        className="cursor-trail"
        style={{
          translateX: cursorXSpring,
          translateY: cursorYSpring,
          opacity: isVisible ? 1 : 0,
        }}
        animate={{
          scale: cursorVariant === 'sphere' ? [1, 1.5, 1] : 1,
        }}
        transition={{ duration: 2, repeat: Infinity }}
      />
    </>
  )
}

export default CustomCursor