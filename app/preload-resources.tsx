'use client'
 
import ReactDOM from 'react-dom'
 
export function PreloadResources() {
    // @ts-ignore
    ReactDOM.prefetchDNS('d2uvmg2nv1rjub.cloudfront.net');
    ReactDOM.preload('https://d2uvmg2nv1rjub.cloudfront.net/rcs-hero-back.mp4');
    return null
}