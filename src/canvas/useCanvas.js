import { useRef, useEffect } from 'react'

const useCanvas = draw => {

    const canvasRef = useRef(null)

    useEffect(() => {
        const canvas = canvasRef.current
        const context = canvas.getContext('2d')
        let frameCount = 0
        let animationFrameId;
    
        const animate = () => {
            frameCount++
            draw(context, frameCount)
            animationFrameId = window.requestAnimationFrame(animate)
        }
    
        animate()
    
        return () => {
            window.cancelAnimationFrame(animationFrameId)
        }
    },[draw])

    return canvasRef
}

export default useCanvas