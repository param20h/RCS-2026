import React from 'react';

function CommunityPartners() {
    return (
        <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-28 pb-16">
            <h2 className="text-5xl lg:text-8xl text-primary font-bold mb-8">Community Partners</h2>
            <div className="mt-12 flex flex-col items-center">
                <div className="glass-card max-w-3xl w-full p-8 lg:p-12 rounded-2xl border-2 border-accent/30 hover:border-accent transition-all duration-300">
                    <div className="text-center space-y-6">
                        <div className="text-6xl mb-4">🌐</div>
                        <h3 className="text-3xl lg:text-4xl font-bold text-white">Join Our Network</h3>
                        <p className="text-lg lg:text-xl text-gray-300 leading-relaxed">
                            Become a community partner and collaborate with us to create an unforgettable experience. 
                            Connect with like-minded communities and expand your reach in the cybersecurity ecosystem.
                        </p>
                        <div className="pt-6">
                            <a 
                                href="https://docs.google.com/forms/d/e/1FAIpQLSc-59yjSFonIDsczqTqrkoD0ar3sx_zeIQ4zRngSwPY-_titw/viewform?usp=dialog"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="inline-block bg-primary hover:bg-primary/90 text-white font-bold py-4 px-10 rounded-xl text-xl transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
                            >
                                Apply to Become a Partner →
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}

export default CommunityPartners;
