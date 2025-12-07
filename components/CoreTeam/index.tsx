import React from 'react';
import { Linkedin, GitHub } from 'react-feather';
import coreTeam from "@/config/coreteam.json";

function CoreTeam() {
    return (
        <section className="min-h-screen px-2 pb-20 mx-auto max-w-7xl sm:px-4 lg:px-8 pt-28">
            <h2 className="mb-16 text-5xl font-bold text-center lg:text-8xl text-primary lg:text-left">Core Team</h2>
            <div className="grid w-full max-w-6xl grid-cols-1 p-4 mx-auto list sm:grid-cols-2 lg:grid-cols-3 gap-y-24 gap-x-8 lg:p-10">
                {coreTeam.map((member, index) => (
                    <div key={member.name} className="relative flex flex-col items-center group">
                        {/* Strap */}
                        <div className="absolute z-0 w-32 h-32 -translate-x-1/2 -top-24 left-1/2">
                            <div className="w-full h-full border-t-8 rounded-t-full border-x-8 border-primary/40"></div>
                        </div>

                        {/* Clip */}
                        <div className="absolute z-20 flex items-center justify-center w-16 h-12 -translate-x-1/2 bg-gray-800 border-2 border-gray-600 rounded-lg -top-4 left-1/2">
                            <div className="w-12 h-1 bg-gray-900 rounded-full"></div>
                        </div>

                        {/* Card */}
                        <div className="relative z-10 w-full max-w-xs glass-card p-0 rounded-xl overflow-hidden transition-transform duration-500 origin-top hover:rotate-2 hover:scale-105 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-t-8 border-primary">
                            {/* Hole Punch Visual */}
                            <div className="absolute z-20 w-20 h-3 -translate-x-1/2 rounded-full top-2 left-1/2 bg-black/80"></div>

                            {/* Header */}
                            <div className="p-4 pt-8 text-center border-b bg-primary/10 border-white/10">
                                <h3 className="text-primary font-bold tracking-[0.2em] text-sm">OFFICIAL CREW</h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">RCS CTF 2026</p>
                            </div>

                            {/* Profile Image */}
                            <div className="flex flex-col items-center p-6">
                                <div className="relative w-32 h-32 mb-4 overflow-hidden transition-colors border-2 rounded-lg shadow-inner border-white/20 group-hover:border-primary">
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={member.img}
                                            alt={member.name}
                                            className="object-cover w-full h-full transition-all duration-300 filter grayscale group-hover:grayscale-0"
                                        />
                                    </a>
                                    {/* Scanline overlay on image */}
                                    <div className="absolute inset-0 pointer-events-none bg-gradient-to-b from-transparent to-black/20"></div>
                                </div>

                                <p className="text-xl font-bold tracking-wide text-center text-white uppercase">{member.name}</p>
                                {/* Deterministic ID generation based on index to fix hydration error */}
                                <p className="mt-1 font-mono text-xs text-primary">
                                    ID: {`RCS-${(index + 2026).toString(16).toUpperCase()}-${member.name.substring(0,2).toUpperCase()}`}
                                </p>
                            </div>

                            {/* Footer / Barcode */}
                            <div className="flex items-center justify-between p-4 border-t bg-black/40 border-white/10">
                                <div className="flex gap-4">
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white">
                                        <Linkedin width={20} height={20} />
                                    </a>
                                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 transition-colors hover:text-white">
                                        <GitHub width={20} height={20} />
                                    </a>
                                </div>
                                {/* Fake Barcode - Deterministic logic based on index and character code */}
                                <div className="flex gap-0.5 h-6 opacity-50">
                                    {[...Array(15)].map((_, i) => (
                                        <div 
                                            key={i} 
                                            className={`w-${(member.name.charCodeAt(i % member.name.length) + i) % 2 === 0 ? '1' : '0.5'} bg-white h-full`}
                                        ></div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CoreTeam;