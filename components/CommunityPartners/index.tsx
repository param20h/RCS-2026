import React from 'react';
import { Linkedin, Globe } from 'react-feather';
import communityPartners from "@/config/communitypartners.json";

function CommunityPartners() {
    return (
        <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-28">
            <h2 className="text-5xl lg:text-8xl text-primary font-bold">Community Partners</h2>
            <div className="list grid grid-cols-2 lg:grid-cols-3 w-full gap-8 lg:gap-16 p-8 lg:p-10 max-w-4xl mx-auto">
                {communityPartners.map((member) => (
                    <div key={member.name} className="flex flex-col items-center lg:px-5">
                        <div className="w-full aspect-square border-primary border-2 rounded-full overflow-hidden">
                        <a href={member.linkedin}><img
                                src={member.img}
                                alt=""
                                className="w-full h-full object-cover"
                            /></a>
                        </div>
                        <p className="name text-md lg:text-lg mt-3 mb-2">{member.name}</p>
                        <div className="links flex gap-4">
                            <a href={member.linkedin}>
                                <Linkedin width={28} height={28} />
                            </a>
                            <a href={member.links}>
                                <Globe width={28} height={28} />
                            </a>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}

export default CommunityPartners;
