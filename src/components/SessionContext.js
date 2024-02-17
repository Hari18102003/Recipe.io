"use client";
import { SessionProvider } from 'next-auth/react'
import React from 'react'

const SessionContext = ({ children }) => {
    return (
        <div>
            <SessionProvider>
                {children}
            </SessionProvider>
        </div>
    )
}

export default SessionContext