import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import useStore from '../store/useStore'
import './LoadingScreen.css'

function LoadingScreen({ loadingProgress: externalProgress }) {
  const setIsLoading = useStore((state) => state.setIsLoading)
  const [internalProgress, setInternalProgress] = useState(0)
  const [loadingText, setLoadingText] = useState('Initializing Universe')

  const loadingProgress = externalProgress !== undefined ? externalProgress : internalProgress

  useEffect(() => {
    const loadingSteps = [
      { text: 'Initializing Universe', duration: 500 },
      { text: 'Loading 3D Assets', duration: 800 },
      { text: 'Setting up Scene', duration: 600 },
      { text: 'Preparing Navigation', duration: 400 },
      { text: 'Almost Ready', duration: 200 },
    ]

    let currentStep = 0
    let progress = 0

    const updateProgress = () => {
      if (currentStep < loadingSteps.length) {
        const step = loadingSteps[currentStep]
        setLoadingText(step.text)

        const stepProgress = step.duration / 100
        const interval = setInterval(() => {
          progress += stepProgress
          setInternalProgress(Math.min(progress, 100))

          if (progress >= (currentStep + 1) * (100 / loadingSteps.length)) {
            clearInterval(interval)
            currentStep++
            if (currentStep < loadingSteps.length) {
              setTimeout(updateProgress, 100)
            } else {
              // All steps complete, wait a bit then hide loading screen
              setTimeout(() => {
                setIsLoading(false)
              }, 300)
            }
          }
        }, 50)
      }
    }

    updateProgress()
  }, [setIsLoading])

  return (
    <motion.div
      className="loading-screen"
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
    >
      <div className="loading-content">
        <motion.div
          className="loading-orb"
          animate={{
            scale: [1, 1.5, 1],
            opacity: [0.3, 1, 0.3],
            boxShadow: [
              '0 0 20px #3498db',
              '0 0 80px #3498db',
              '0 0 20px #3498db',
            ],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeInOut',
          }}
        >
          <motion.div
            className="loading-orb-inner"
            animate={{ rotate: 360 }}
            transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
          />
        </motion.div>

        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5 }}
        >
          Initializing Universe
        </motion.h2>

        <motion.div
          className="loading-progress"
          initial={{ width: 0 }}
          animate={{ width: `${loadingProgress}%` }}
          transition={{ duration: 0.1, ease: 'easeOut' }}
        />

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.5 }}
          className="loading-text"
        >
          {loadingText}
        </motion.p>
      </div>
    </motion.div>
  )
}

export default LoadingScreen