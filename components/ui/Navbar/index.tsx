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
    }
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
                        <div className="w-full px-2 py-2 mx-auto sm:px-4 lg:px-8">
                            <div className="relative flex items-center justify-between w-full h-16">
                                <div className="flex items-center w-full px-2 lg:px-0">
                                    <a href="/" className="flex items-center gap-2 transition-transform cursor-pointer shrink-0 hover:scale-105">
                                        <img
                                            src="/logo.png"
                                            alt="RCS CTF Logo"
                                            className="w-auto h-12"
                                        />
                                        <span className="hidden text-xl font-bold tracking-wider text-white sm:block">RCS CTF 2026</span>
                                    </a>
                                    <div className="hidden lg:ml-auto lg:block">
                                        <div className="flex space-x-4">
                                            {navigation.map((item) => (
                                                <a
                                                    key={item.name}
                                                    href={item.href}
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
                                    <Disclosure.Button className="inline-flex items-center justify-center p-2 text-gray-400 rounded-md hover:bg-white/10 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white">
                                        <span className="sr-only">
                                            Open main menu
                                        </span>
                                        {open ? (
                                            <XMarkIcon
                                                className="block w-6 h-6"
                                                aria-hidden="true"
                                            />
                                        ) : (
                                            <Bars3Icon
                                                className="block w-6 h-6"
                                                aria-hidden="true"
                                            />
                                        )}
                                    </Disclosure.Button>
                                </div>
                            </div>
                        </div>
                        <Disclosure.Panel className="mt-2 overflow-hidden lg:hidden glass-card rounded-xl">
                            <div className="px-2 pt-2 pb-3 space-y-1">
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