"use client"

import { Player } from '@lottiefiles/react-lottie-player'
import animationData from "../assets/animation/Animation - 1698684113653.json";

const LottiePi = () => {
  return (
    <div>
        <Player autoplay loop src={animationData} style={{ height: '100%', width: '100%' }}>
        </Player>
    </div>
  )
}

export default LottiePi