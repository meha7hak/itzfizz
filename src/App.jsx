import React, { useEffect, useRef } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function App() {
    const containerRef = useRef(null);
    const carRef = useRef(null);
    const greenBarRef = useRef(null);
    const card1Ref = useRef(null);
    const card2Ref = useRef(null);
    const card3Ref = useRef(null);
    const roadBaseTextRef = useRef(null);

    useEffect(() => {
        // Initial Load Animation
        gsap.from(roadBaseTextRef.current, {
            opacity: 0,
            scale: 0.95,
            y: 20,
            duration: 1.5,
            ease: 'power3.out'
        });

        // set initial transform correctly bypassing tailwind conflicts
        gsap.set(carRef.current, { xPercent: -50, yPercent: -50 });

        // Make car fade in smoothly on load
        gsap.from(carRef.current, {
            opacity: 0,
            scale: 0.8,
            duration: 1.5,
            ease: 'power3.out'
        });

        // Scroll trigger pinning
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: containerRef.current,
                start: 'top top',
                end: '+=4000',
                scrub: 1,
                pin: true,
            }
        });

        // Animate car and green bar synchronously
        tl.to(greenBarRef.current, { width: '100vw', ease: 'none', duration: 10 }, 0);
        // Move the car slightly ahead of the green bar line as you scroll
        tl.to(carRef.current, { x: '110vw', ease: 'none', duration: 10 }, 0);

        // Pop up cards at specific progress points
        tl.to(card1Ref.current, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }, 2);
        tl.to(card2Ref.current, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }, 5);
        tl.to(card3Ref.current, { scale: 1, opacity: 1, duration: 1, ease: 'back.out(1.7)' }, 8);

        return () => {
            ScrollTrigger.getAll().forEach(t => t.kill());
        }
    }, []);

    return (
        <div className="bg-[#cccccc] w-full min-h-screen font-sans overflow-x-hidden">
            <section ref={containerRef} className="h-screen w-full relative flex items-center justify-center overflow-hidden">

                {/* Top Card */}
                <div
                    ref={card1Ref}
                    className="absolute top-[5%] md:top-[10%] left-[20%] bg-purple-900/95 p-6 rounded-full flex flex-col items-center justify-center text-center shadow-[0_10px_40px_rgba(88,28,135,0.6)] transform scale-0 opacity-0 z-30 w-52 h-52 md:w-64 md:h-64"
                >
                    <div className="text-5xl font-bold text-white mb-2">58%</div>
                    <div className="text-sm font-medium text-white/90 px-4">Increase in pick up point use</div>
                </div>

                {/* Bottom Card */}
                <div
                    ref={card2Ref}
                    className="absolute bottom-[5%] md:bottom-[10%] left-[45%] bg-rose-900/95 p-6 rounded-full flex flex-col items-center justify-center text-center shadow-[0_10px_40px_rgba(159,18,57,0.6)] transform scale-0 opacity-0 z-30 w-52 h-52 md:w-64 md:h-64"
                >
                    <div className="text-5xl font-bold text-white mb-2">23%</div>
                    <div className="text-sm font-medium text-white/90 px-4">Decreased in customer phone calls</div>
                </div>

                {/* Third Card */}
                <div
                    ref={card3Ref}
                    className="absolute top-[5%] md:top-[10%] left-[70%] bg-fuchsia-900/95 p-6 rounded-full flex flex-col items-center justify-center text-center shadow-[0_10px_40px_rgba(112,26,117,0.6)] transform scale-0 opacity-0 z-30 w-52 h-52 md:w-64 md:h-64"
                >
                    <div className="text-5xl font-bold text-white mb-2">100%</div>
                    <div className="text-sm font-medium text-white/90 px-4">Seamless integration & growth</div>
                </div>

                {/* The Road */}
                <div className="relative w-full h-[40vh] min-h-[300px] bg-gradient-to-b from-[#8B5A2B] via-[#5C3A21] to-[#3E2723] border-y border-white/40 flex items-center overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
                    {/* Glossy reflection */}
                    <div className="absolute top-0 left-0 w-full h-[50%] bg-gradient-to-b from-white/30 via-white/5 to-transparent pointer-events-none z-0"></div>
                    <div className="absolute bottom-0 left-0 w-full h-[30%] bg-gradient-to-t from-black/80 to-transparent pointer-events-none z-0"></div>

                    {/* Base Dark Text */}
                    <div
                        ref={roadBaseTextRef}
                        className="absolute left-[5vw] md:left-[10vw] top-0 bottom-0 flex items-center text-[#111111] opacity-40 text-5xl md:text-8xl font-black whitespace-nowrap tracking-widest z-0 select-none pb-4"
                    >
                        WELCOME ITZFIZZ
                    </div>

                    {/* Green Overlay Bar */}
                    <div
                        ref={greenBarRef}
                        className="absolute left-0 top-0 bottom-0 bg-[#4ade80] overflow-hidden z-10 w-0 border-r-4 border-emerald-600/50"
                    >
                        {/* The Text Revealed within the green overlay */}
                        <div className="absolute left-[5vw] md:left-[10vw] top-0 bottom-0 flex items-center text-[#111111] text-5xl md:text-8xl font-black whitespace-nowrap tracking-widest select-none pb-4">
                            WELCOME ITZFIZZ
                        </div>
                    </div>
                    {/* Car Image - placed relative to the window but animated alongside the bar */}
                    <div
                        ref={carRef}
                        className="absolute left-0 top-1/2 z-20 pointer-events-none"
                    >
                        <img src="/car.svg" alt="Car" className="w-[200px] md:w-[350px] filter drop-shadow-[0_20px_20px_rgba(0,0,0,0.8)]" />
                    </div>

                </div>
            </section>
        </div>
    );
}
