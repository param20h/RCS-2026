'use client'
import React, { Fragment, useState } from 'react'

import { Disclosure, Menu, Transition } from '@headlessui/react'
import {
    Bars3Icon,
    BellIcon,
    XMarkIcon,
    HomeIcon,
} from '@heroicons/react/24/outline'

import { cn } from '@/lib/utils'
import RegisterDialog from '@/components/RegisterDialog'

const navigation = [
    {
        name: 'Join Discord',
        href: 'https://s.encryptedge.in/discord',
        current: false,
    },
]

const Navbar = () => {
    const [registerOpen, setRegisterOpen] = useState(false)
    return (
        <>
            <Disclosure
                as="nav"
                className="fixed top-4 left-0 right-0 mx-auto w-[95%] max-w-7xl z-50 glass-card rounded-2xl transition-all duration-300"
            >
                {({ open }) => (
                    <>
                        <div className="mx-auto px-2 sm:px-4 lg:px-8 w-full py-2">
                            <div className="relative flex h-16 items-center justify-between w-full">
                                <div className="flex items-center px-2 lg:px-0 w-full">
                                    <div className="shrink-0 flex items-center gap-2 cursor-pointer hover:scale-105 transition-transform">
                                        <img
                                            src="/logo.png"
                                            alt="RCS CTF Logo"
                                            className="h-12 w-auto"
                                        />
                                        <span className="font-bold text-xl tracking-wider text-white hidden sm:block">RCS CTF 2026</span>
                                    </div>
                                    <div className="hidden lg:ml-auto lg:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
                                                    target="_blank"
                                                    className={cn(
                                                        'rounded-md px-3 py-2 text-lg font-medium flex items-center gap-2 transition-all duration-300 relative group',
                                                        {
                                                            'text-primary': item.current,
                                                            'text-gray-300 hover:text-white': !item.current,
                                                        }
                                                    )}
                                                    aria-current={
                                                        item.current
                                                            ? 'page'
                                                            : undefined
                                                    }
                                                >
                                                    {item.name}
                                                    <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary transition-all duration-300 group-hover:w-full"></span>
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                                <div className="flex lg:hidden">
                                    {/* Mobile menu button */}
                                    <Disclosure.Button className="inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block h-6 w-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                        <Disclosure.Panel className="lg:hidden glass-card mt-2 rounded-xl overflow-hidden">
                            <div className="space-y-1 px-2 pb-3 pt-2">
                                {navigation.map((item) => (
                                    <Disclosure.Button
                                        key={item.name}
                                        as="a"
                                        href={item.href}
                                        className={cn(
                                            'block rounded-md px-3 py-2 text-base font-medium transition-colors',
                                            {
                                                'bg-primary/20 text-white':
                                                    item.current,
                                                'text-gray-300 hover:bg-white/10 hover:text-white':
                                                    !item.current,
                                            }
                                        )}
                                        aria-current={
                                            item.current ? 'page' : undefined
                                        }
                                    >
                                        {item.name}
                                    </Disclosure.Button>
                                ))}
                                <Disclosure.Button
                                    as="a"
                                    href="#ticketSection"
                                    className={cn(
                                        'block px-3 py-2 text-base font-medium text-black bg-white rounded-md hover:bg-gray-200 transition-colors mt-4 text-center'
                                    )}
                                    onClick={() => setRegisterOpen(false)}
                                >
                                    Get passes
                                </Disclosure.Button>
                            </div>
                        </Disclosure.Panel>
                    </>
                )}
            </Disclosure>
            <RegisterDialog open={registerOpen} setOpen={setRegisterOpen} />
        </>
    )
}

export default Navbar
