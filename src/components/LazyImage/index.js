import React, { useEffect, useState } from 'react';
import { Animated } from 'react-native';

import { Small, Original } from './styles';

const OriginalAnimated = Animated.createAnimatedComponent(Original);

function LazyImage({
    smallSource,
    source,
    aspectRatio,
    shouldLoad,
}) {
    const opacity = new Animated.Value(0);
    const [loaded, setLoaded] = useState(false)

    useEffect(() => {
        if (shouldLoad) {
            setTimeout(() => {
                setLoaded(true);
            }, 500);
        }
    }, [shouldLoad]);

    function handleAnimate() {
        Animated.timing(opacity, {
            toValue: 1,
            duration: 500,
            useNativeDriver: true,
        }).start();
    }

    return (
        <Small 
            source={smallSource} 
            ratio={aspectRatio} 
            resizeMode="contain"
            blurRadius={2}
        >
            {
                loaded && <OriginalAnimated 
                    style={{ opacity }}
                    source={source}
                    ratio={aspectRatio}
                    resizeMode="contain"
                    onLoadEnd={handleAnimate}
                />
            }
        </Small>
    )
}

export default LazyImage;
