"use client";
import { CalendarIcon, TrophyIcon, ArrowRightIcon } from '@heroicons/react/24/outline'
import sponsorsData from '@/config/sponsors.json'
import communityPartners from '@/config/communitypartners.json'

export default function CommunityHome() {
    const events = [
        {
            year: "2026",
            title: "RCS CTF 2026",
            subtitle: "Decrypt, Defend, Conquer",
            description: "Join us for the second edition of Republic of Cyber Sentinels - bigger, better, and more challenging than ever.",
            date: "30 January 2026",
            status: "Upcoming Event",
            image: "/rcs-back2.webp",
            eventUrl: "/rcs-2026",
            highlights: ["Advanced Challenges", "Expert Speakers", "Prizes Worth Lakhs"]
        },
        {
            year: "2024",
            title: "RCS CTF 2024",
            subtitle: "Republic of Cyber Sentinels",
            description: "Our inaugural capture-the-flag event brought together 500+ cybersecurity enthusiasts for an unforgettable experience.",
            date: "January 2024",
            status: "Past Event",
            image: "/rcs-back1.webp",
            blogUrl: "https://blog.encryptedge.in/2023/RCS-CTF-2024/",
            highlights: ["500+ Participants", "24 Hour CTF", "50+ Challenges"]
        },
        {
            year: "2024",
            title: "Cybersec Symposium",
            subtitle: "CTF Competition",
            description: "A comprehensive cybersecurity event featuring competitive CTF challenges and technical sessions with industry experts.",
            date: "2024",
            status: "Past Event",
            image: "/rcs-back1.webp",
            blogUrl: "#",
            highlights: ["CTF Competition", "Industry Experts", "Technical Sessions"]
        },
        {
            year: "2024",
            title: "WiFi Hacking Workshop",
            subtitle: "Hands-on Security Training",
            description: "An intensive hands-on workshop focused on wireless security, penetration testing techniques, and WiFi attack vectors.",
            date: "2023",
            status: "Past Event",
            image: "/rcs-back2.webp",
            blogUrl: "#",
            highlights: ["Hands-on Labs", "Wireless Security", "Penetration Testing"]
        }
    ]

    return (
        <main className="text-text">
            {/* Hero Section */}
            <section className="relative min-h-screen w-screen overflow-hidden flex items-center justify-center">
                <div className="scanlines"></div>
                <div className="relative px-4 lg:px-8 pt-32 pb-20 mx-auto max-w-7xl z-20 text-center">
                    <h1 className="text-6xl lg:text-8xl font-bold glitch mb-6">
                        <span className="text-primary glitch">ENCRYPT EDGE</span>
                    </h1>
                    <p className="text-2xl lg:text-3xl text-gray-300 max-w-3xl mx-auto mb-8">
                        India's Premier Cybersecurity Community
                    </p>
                    <p className="text-lg lg:text-xl text-gray-400 max-w-2xl mx-auto">
                        Building a thriving ecosystem of cybersecurity professionals, students, and enthusiasts through world-class CTF competitions and educational initiatives.
                    </p>
                    
                    {/* Quick Stats */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-16 max-w-4xl mx-auto">
                        <div className="glass-card p-6 rounded-xl border border-primary/30">
                            <div className="text-4xl font-bold text-primary mb-2">4</div>
                            <div className="text-gray-300">Events Hosted</div>
                        </div>
                        <div className="glass-card p-6 rounded-xl border border-primary/30">
                            <div className="text-4xl font-bold text-primary mb-2">500+</div>
                            <div className="text-gray-300">Community Members</div>
                        </div>
                        <div className="glass-card p-6 rounded-xl border border-primary/30">
                            <div className="text-4xl font-bold text-primary mb-2">100+</div>
                            <div className="text-gray-300">CTF Challenges</div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Upcoming Event Impact Section */}
            <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
                <div className="relative overflow-hidden rounded-3xl border-2 border-primary">
                    {/* Background gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-transparent to-accent/20"></div>
                    
                    <div className="relative z-10 glass-card p-8 lg:p-16">
                        <div className="text-center mb-12">
                            <div className="inline-block px-6 py-2 bg-primary rounded-full text-white font-bold mb-6 animate-pulse">
                                COMING SOON
                            </div>
                            <h2 className="text-5xl lg:text-7xl font-bold mb-6">
                                <span className="text-primary">RCS CTF 2026</span>
                            </h2>
                            <p className="text-2xl lg:text-3xl text-gray-300 mb-4">
                                Decrypt, Defend, Conquer
                            </p>
                            <div className="flex items-center justify-center gap-2 text-xl text-gray-400 mb-8">
                                <CalendarIcon className="w-6 h-6" />
                                <span>January 30- 31, 2026</span>
                            </div>
                        </div>

                        {/* Impact Highlights */}
                        <div className="grid md:grid-cols-3 gap-8 mb-12">
                            <div className="text-center p-6 rounded-xl bg-primary/10 border border-primary/30">
                                <div className="text-5xl mb-4">🎯</div>
                                <h3 className="text-2xl font-bold text-primary mb-3">Real-World Skills</h3>
                                <p className="text-gray-300">
                                    Advanced challenges designed to simulate real cybersecurity scenarios and build practical skills
                                </p>
                            </div>
                            <div className="text-center p-6 rounded-xl bg-accent/10 border border-accent/30">
                                <div className="text-5xl mb-4">🌐</div>
                                <h3 className="text-2xl font-bold text-accent mb-3">Network & Learn</h3>
                                <p className="text-gray-300">
                                    Connect with industry experts, professionals, and fellow enthusiasts from across India
                                </p>
                            </div>
                            <div className="text-center p-6 rounded-xl bg-primary/10 border border-primary/30">
                                <div className="text-5xl mb-4">🏆</div>
                                <h3 className="text-2xl font-bold text-primary mb-3">Career Impact</h3>
                                <p className="text-gray-300">
                                    Win prizes, gain recognition, and open doors to exciting cybersecurity career opportunities
                                </p>
                            </div>
                        </div>

                        {/* Key Features */}
                        <div className="bg-black/30 rounded-2xl p-8 mb-12">
                            <h3 className="text-3xl font-bold text-center mb-8">What Makes RCS 2026 Special</h3>
                            <div className="grid md:grid-cols-2 gap-6">
                                <div className="flex items-start gap-4">
                                    <div className="text-primary text-2xl mt-1">✓</div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Cutting-Edge Challenges</h4>
                                        <p className="text-gray-400">From web exploitation to cryptography, reverse engineering to forensics</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="text-primary text-2xl mt-1">✓</div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Expert Mentorship</h4>
                                        <p className="text-gray-400">Learn from industry leaders and cybersecurity professionals</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="text-primary text-2xl mt-1">✓</div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">Exciting Prizes</h4>
                                        <p className="text-gray-400">Compete for prizes worth lakhs and exclusive swag</p>
                                    </div>
                                </div>
                                <div className="flex items-start gap-4">
                                    <div className="text-primary text-2xl mt-1">✓</div>
                                    <div>
                                        <h4 className="text-xl font-bold mb-2">All Skill Levels</h4>
                                        <p className="text-gray-400">Whether you're a beginner or expert, there's something for everyone</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* CTA */}
                        <div className="text-center">
                            <a 
                                href="/rcs-2026"
                                className="inline-flex items-center gap-3 bg-primary hover:bg-primary/90 text-white font-bold py-5 px-10 rounded-xl text-xl transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-primary/50"
                            >
                                <TrophyIcon className="w-6 h-6" />
                                Registration Opens on 10th January
                                <ArrowRightIcon className="w-6 h-6" />
                            </a>
                            <p className="text-gray-400 mt-4">Limited seats available - Don't miss out!</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* Events Section */}
            <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
                <h2 className="text-5xl lg:text-7xl font-bold text-center mb-16">
                    Our <span className="text-primary">Events</span>
                </h2>
                
                <div className="space-y-16">
                    {events.map((event, index) => (
                        <div 
                            key={`${event.year}-${event.title}`}
                            className={`glass-card rounded-3xl overflow-hidden border-2 border-primary/30 hover:border-primary transition-all duration-300 ${index % 2 === 0 ? '' : ''}`}
                        >
                            <div className={`grid md:grid-cols-2 gap-0 ${index % 2 === 0 ? '' : 'md:grid-flow-dense'}`}>
                                {/* Image Side */}
                                <div className={`relative h-64 md:h-auto ${index % 2 === 0 ? '' : 'md:col-start-2'}`}>
                                    <div 
                                        className="absolute inset-0 bg-cover bg-center"
                                        style={{ backgroundImage: `url(${event.image})` }}
                                    >
                                        <div className="absolute inset-0 bg-gradient-to-r from-black/80 to-black/40"></div>
                                    </div>
                                    <div className="absolute top-6 left-6">
                                        <span className={`px-4 py-2 rounded-full text-sm font-bold ${
                                            event.status === 'Upcoming Event' 
                                                ? 'bg-primary text-white' 
                                                : 'bg-gray-700 text-gray-300'
                                        }`}>
                                            {event.status}
                                        </span>
                                    </div>
                                </div>

                                {/* Content Side */}
                                <div className="p-8 lg:p-12 flex flex-col justify-center">
                                    <div className="text-primary font-bold text-xl mb-2">{event.year}</div>
                                    <h3 className="text-4xl lg:text-5xl font-bold mb-3">{event.title}</h3>
                                    <p className="text-xl text-gray-400 mb-4">{event.subtitle}</p>
                                    <p className="text-lg text-gray-300 mb-6 leading-relaxed">
                                        {event.description}
                                    </p>
                                    
                                    {/* Highlights */}
                                    <div className="flex flex-wrap gap-3 mb-6">
                                        {event.highlights.map((highlight, idx) => (
                                            <span 
                                                key={idx}
                                                className="px-4 py-2 bg-primary/10 border border-primary/30 rounded-lg text-sm"
                                            >
                                                {highlight}
                                            </span>
                                        ))}
                                    </div>

                                    {/* Date */}
                                    <div className="flex items-center gap-2 text-gray-400 mb-6">
                                        <CalendarIcon className="w-5 h-5" />
                                        <span>{event.date}</span>
                                    </div>

                                    {/* CTA Button */}
                                    {event.eventUrl && (
                                        <a 
                                            href={event.eventUrl}
                                            className="inline-flex items-center gap-2 bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50 w-fit"
                                        >
                                            Explore Event <ArrowRightIcon className="w-5 h-5" />
                                        </a>
                                    )}
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>

            {/* Previous Sponsors Section */}
            <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
                <h2 className="text-5xl lg:text-7xl font-bold text-center mb-16">
                    Past <span className="text-primary">Sponsors</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
                    {sponsorsData.flatMap(category => category.sponsors).map((sponsor, idx) => (
                        <a
                            key={idx}
                            href={sponsor.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card p-6 rounded-xl border border-primary/30 hover:border-primary transition-all duration-300 hover:scale-105 w-full max-w-[200px]"
                        >
                            <img
                                src={sponsor.logo}
                                alt={sponsor.name}
                                className="w-full h-auto object-contain"
                            />
                        </a>
                    ))}
                </div>
            </section>

            {/* Previous Community Partners Section */}
            <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
                <h2 className="text-5xl lg:text-7xl font-bold text-center mb-16">
                    Previous <span className="text-accent">Community Partners</span>
                </h2>
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 items-center justify-items-center">
                    {communityPartners.filter(partner => partner.name !== "Coming Soon").map((partner, idx) => (
                        <a
                            key={idx}
                            href={partner.linkedin || partner.links}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="glass-card p-6 rounded-xl border border-accent/30 hover:border-accent transition-all duration-300 hover:scale-105 w-full max-w-[200px] flex items-center justify-center"
                        >
                            {partner.img && (
                                <img
                                    src={partner.img}
                                    alt={partner.name}
                                    className="w-full h-auto object-contain rounded-lg"
                                />
                            )}
                            {!partner.img && (
                                <p className="text-center font-bold">{partner.name}</p>
                            )}
                        </a>
                    ))}
                </div>
            </section>

            {/* Community Section */}
            <section className="max-w-7xl mx-auto px-4 lg:px-8 py-20">
                <div className="glass-card rounded-3xl p-8 lg:p-16 border-2 border-accent/30 text-center">
                    <h2 className="text-4xl lg:text-6xl font-bold mb-6">
                        Join Our <span className="text-accent">Community</span>
                    </h2>
                    <p className="text-xl text-gray-300 mb-10 max-w-3xl mx-auto">
                        Connect with like-minded cybersecurity enthusiasts, participate in challenges, 
                        and stay updated with the latest in information security.
                    </p>
                    <div className="flex flex-wrap gap-4 justify-center">
                        <a 
                            href="https://discord.gg/hT826cUw"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-accent hover:bg-accent/90 text-black font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-accent/50"
                        >
                            Join Discord
                        </a>
                        <a 
                            href="https://chat.whatsapp.com/Kdzl9jmcE4f2RiPcKhxguE"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="bg-primary hover:bg-primary/90 text-white font-bold py-4 px-8 rounded-xl text-lg transition-all duration-300 hover:scale-105 hover:shadow-lg hover:shadow-primary/50"
                        >
                            Join WhatsApp
                        </a>
                    </div>
                </div>
            </section>
        </main>
    )
}
