import { useState, useEffect } from 'react'
import * as THREE from 'three'

export function useAssetLoader() {
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [isLoaded, setIsLoaded] = useState(false)
  const [assets, setAssets] = useState({})

  useEffect(() => {
    const manager = new THREE.LoadingManager()

    // Track loading progress
    manager.onProgress = (url, loaded, total) => {
      const progress = (loaded / total) * 100
      setLoadingProgress(progress)
    }

    manager.onLoad = () => {
      setIsLoaded(true)
    }

    manager.onError = (url) => {
      console.warn(`Failed to load asset: ${url}`)
    }

    // Store the manager for use in components
    setAssets({ manager })

    return () => {
      // Cleanup if needed
    }
  }, [])

  return { loadingProgress, isLoaded, assets }
}
