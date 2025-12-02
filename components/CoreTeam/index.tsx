import React from 'react';
import { Linkedin, GitHub } from 'react-feather';
import coreTeam from "@/config/coreteam.json";

function CoreTeam() {
    return (
        <section className="min-h-screen max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-28 pb-20">
            <h2 className="text-5xl lg:text-8xl text-primary font-bold mb-16 text-center lg:text-left">Core Team</h2>
            <div className="list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-y-24 gap-x-8 p-4 lg:p-10 max-w-6xl mx-auto">
                {coreTeam.map((member) => (
                    <div key={member.name} className="relative group flex flex-col items-center">
                        {/* Strap */}
                        <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-32 h-32 z-0">
                            <div className="w-full h-full border-x-8 border-t-8 border-primary/40 rounded-t-full"></div>
                        </div>

                        {/* Clip */}
                        <div className="absolute -top-4 left-1/2 -translate-x-1/2 w-16 h-12 bg-gray-800 rounded-lg z-20 border-2 border-gray-600 flex items-center justify-center">
                            <div className="w-12 h-1 bg-gray-900 rounded-full"></div>
                        </div>

                        {/* Card */}
                        <div className="relative z-10 w-full max-w-xs glass-card p-0 rounded-xl overflow-hidden transition-transform duration-500 origin-top hover:rotate-2 hover:scale-105 shadow-[0_10px_40px_rgba(0,0,0,0.5)] border-t-8 border-primary">
                            {/* Hole Punch Visual */}
                            <div className="absolute top-2 left-1/2 -translate-x-1/2 w-20 h-3 bg-black/80 rounded-full z-20"></div>

                            {/* Header */}
                            <div className="bg-primary/10 p-4 pt-8 text-center border-b border-white/10">
                                <h3 className="text-primary font-bold tracking-[0.2em] text-sm">OFFICIAL CREW</h3>
                                <p className="text-[10px] text-gray-400 uppercase tracking-widest mt-1">RCS CTF 2026</p>
                            </div>

                            {/* Profile Image */}
                            <div className="p-6 flex flex-col items-center">
                                <div className="w-32 h-32 rounded-lg overflow-hidden border-2 border-white/20 shadow-inner mb-4 relative group-hover:border-primary transition-colors">
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                        <img
                                            src={member.img}
                                            alt={member.name}
                                            className="w-full h-full object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                        />
                                    </a>
                                    {/* Scanline overlay on image */}
                                    <div className="absolute inset-0 bg-gradient-to-b from-transparent to-black/20 pointer-events-none"></div>
                                </div>

                                <p className="text-xl font-bold text-white text-center uppercase tracking-wide">{member.name}</p>
                                <p className="text-xs text-primary mt-1 font-mono">ID: {Math.random().toString(36).substr(2, 8).toUpperCase()}</p>
                            </div>

                            {/* Footer / Barcode */}
                            <div className="bg-black/40 p-4 border-t border-white/10 flex justify-between items-center">
                                <div className="flex gap-4">
                                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                        <Linkedin width={20} height={20} />
                                    </a>
                                    <a href={member.github} target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors">
                                        <GitHub width={20} height={20} />
                                    </a>
                                </div>
                                {/* Fake Barcode */}
                                <div className="flex gap-0.5 h-6 opacity-50">
                                    {[...Array(15)].map((_, i) => (
                                        <div key={i} className={`w-${Math.random() > 0.5 ? '1' : '0.5'} bg-white h-full`}></div>
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
