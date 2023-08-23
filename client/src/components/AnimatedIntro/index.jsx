import React from 'react';
import './styles.css'
import Lottie from "lottie-react";
import animation from '../../assets/animation_llnf48ob.json'

function AnimatedIntro () {
    const lottieOptions = {
        loop: true,
        autoplay: true,
        animationData: animation,
        rendererSettings: {
            preserveAspectRatio: 'xMidYMid slice',
        },
    };

    return (
        <div className="intro-container">
            <h1 className="title">Dish Discovery</h1>
            <h3>Welcome to DishDiscovery! </h3>
            <p className="description-title">Embark on a culinary journey and explore a world of flavors with us. Join now and start discovering delicious recipes online.
            </p>
        <div className="lotti-animation">
            <Lottie options={lottieOptions}  animationData={animation} height={50} width={50}/>
        </div>
        </div>

    );
}
export default AnimatedIntro;
