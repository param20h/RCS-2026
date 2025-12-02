import React from 'react';

function Organisers() {
    return (
        <section className="max-w-7xl mx-auto px-2 sm:px-4 lg:px-8 pt-28">
            <h2 className="text-5xl lg:text-8xl text-primary font-bold">Organisers</h2>
            <div className="list w-full gap-8 lg:gap-16 p-8 lg:p-10 max-w-4xl mx-auto">
                    <div key="ee" className="flex flex-col items-center lg:px-5">
                        <div className="w-full border-primary border-2 overflow-hidden">
                          <a href='https://fyp.bio/encryptedge'>  <img
                                src="/ee.webp"
                                alt=""
                                className="w-full h-full object-cover"
                            />
                        </a>
                        </div>
                    </div>
            </div>
        </section>
    );
}

export default Organisers;
