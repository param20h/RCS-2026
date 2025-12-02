import React from 'react';
import { Linkedin } from 'react-feather';
import rersourcePersons from "@/config/resourcepersons.json";

function RersourcePersons() {
    return (
        <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-28 pb-20">
            <h2 className="text-5xl lg:text-8xl text-primary font-bold mb-16 text-center lg:text-left">Advisory Committee</h2>
            <div className="list grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 w-full gap-8 p-4 lg:p-10 max-w-6xl mx-auto">
                {rersourcePersons.map((member) => (
                    <div key={member.name} className="relative group">
                        {/* Holographic Card Container */}
                        <div
                            className="relative bg-black/40 border border-primary/30 p-6 transition-all duration-300 hover:border-primary hover:shadow-[0_0_30px_rgba(255,41,109,0.2)] group-hover:-translate-y-2"
                            style={{
                                clipPath: 'polygon(20px 0, 100% 0, 100% calc(100% - 20px), calc(100% - 20px) 100%, 0 100%, 0 20px)'
                            }}
                        >
                            {/* Decorative Corner Lines */}
                            <div className="absolute top-0 left-0 w-8 h-8 border-l-2 border-t-2 border-primary/50"></div>
                            <div className="absolute bottom-0 right-0 w-8 h-8 border-r-2 border-b-2 border-primary/50"></div>

                            {/* Header Status */}
                            <div className="flex justify-between items-center mb-6 border-b border-primary/20 pb-2">
                                <span className="text-xs font-mono text-primary/80 animate-pulse">● ONLINE</span>
                                <span className="text-[10px] font-mono text-gray-500">SEC_LEVEL_5</span>
                            </div>

                            {/* Hexagonal Image Container */}
                            <div className="flex justify-center mb-6 relative">
                                <div className="relative w-32 h-32 transition-transform duration-500 group-hover:scale-110">
                                    {/* Rotating Ring */}
                                    <div className="absolute inset-0 rounded-full border border-dashed border-primary/30 animate-[spin_10s_linear_infinite]"></div>

                                    <div
                                        className="w-full h-full overflow-hidden bg-gray-900"
                                        style={{
                                            clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)'
                                        }}
                                    >
                                        <a href={member.linkedin} target="_blank" rel="noopener noreferrer">
                                            <img
                                                src={member.img}
                                                alt={member.name}
                                                className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                                            />
                                        </a>
                                    </div>
                                </div>
                            </div>

                            {/* Info */}
                            <div className="text-center space-y-2">
                                <h3 className="text-xl font-bold text-white font-mono tracking-wider group-hover:text-primary transition-colors">{member.name}</h3>
                                <div className="h-px w-12 bg-primary/50 mx-auto"></div>
                                <p className="text-xs text-gray-400 font-mono uppercase tracking-widest">Advisor</p>
                            </div>

                            {/* Footer / Link */}
                            <div className="mt-6 flex justify-center">
                                <a
                                    href={member.linkedin}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="flex items-center gap-2 px-4 py-2 bg-primary/10 hover:bg-primary/20 border border-primary/50 rounded text-primary text-xs font-mono transition-all hover:shadow-[0_0_10px_theme('colors.primary')]"
                                >
                                    <Linkedin size={14} />
                                    <span>CONNECT_LINK</span>
                                </a>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default RersourcePersons;
