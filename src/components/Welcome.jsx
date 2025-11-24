import React from 'react'
import { useRef, useEffect } from 'react'
import gsap from 'gsap'

const FONT_WEIGHTS = {
    subtitle: { min: 100, max: 400, default: 100 },
    title: { min: 400, max: 900, default: 400 },
}

const renderText = (text, className, baseWeight = 400) => {
    return [...text].map((char, index) => (
        <span
            key={index}
            className={className}
            style={{ fontVariationSettings: `'wght' ${baseWeight}` }}
        >
            {char === ' ' ? '\u00A0' : char}
        </span>
    ))
}

const setupTextHover = (container, type) => {
    if (!container) return () => {}

    const letters = Array.from(container.querySelectorAll('span'))
    const { min, max, default: base } = FONT_WEIGHTS[type]
    const maxDistance = 150

    const animateLetter = (letter, weight, duration = 0.25) => {
        // clamp to valid range
        const clamped = Math.round(Math.max(min, Math.min(max, weight)))
        return gsap.to(letter, {
            duration,
            ease: 'power2.out',
            fontVariationSettings: `'wght' ${clamped}`,
        })
    }

    const handleMouseMove = (e) => {
        const { left } = container.getBoundingClientRect()
        const mouseX = e.clientX - left

        letters.forEach((letter) => {
            const { left: letterLeft, width: letterWidth } = letter.getBoundingClientRect()
            const letterCenterX = letterLeft - left + letterWidth / 2
            const distance = Math.abs(mouseX - letterCenterX)
            const normalized = Math.max(0, 1 - distance / maxDistance) // 1 when close, 0 when far
            const newWeight = base + (max - base) * normalized
            animateLetter(letter, newWeight, 0.18)
        })
    }

    const handleMouseLeave = () => {
        letters.forEach((letter, i) => {
            // stagger return to base a little for a nicer effect
            animateLetter(letter, base, 0.4 + i * 0.01)
        })
    }

    container.addEventListener('mousemove', handleMouseMove)
    container.addEventListener('mouseleave', handleMouseLeave)

    return () => {
        container.removeEventListener('mousemove', handleMouseMove)
        container.removeEventListener('mouseleave', handleMouseLeave)
    }
}

const Welcome = () => {
    const titleRef = useRef(null)
    const subTitleRef = useRef(null)

    useEffect(() => {
        // titleRef holds the smaller line -> treat as 'subtitle'
        const cleanupSubtitle = setupTextHover(titleRef.current, 'subtitle')
        // subTitleRef holds the big "Developer" -> treat as 'title'
        const cleanupTitle = setupTextHover(subTitleRef.current, 'title')

        return () => {
            if (typeof cleanupSubtitle === 'function') cleanupSubtitle()
            if (typeof cleanupTitle === 'function') cleanupTitle()
        }
    }, [])

    return (
        <section id="welcome">
            <p ref={titleRef}>
                {renderText("Hey I am Sagar! A Full Stack", 'text-3xl font-georama font-extrabold', 100)}
            </p>
            <h1 ref={subTitleRef} className="mt-7">
                {renderText('Developer', 'text-9xl italic font-georama', 400)}
            </h1>

            <div className="small-screen">
                <p>This Portfolio is designed for Laptop/Tablet screens only</p>
            </div>
        </section>
    )
}

export default Welcome
