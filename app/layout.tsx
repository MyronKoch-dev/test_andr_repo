/**
 * Root layout component for the Next.js application
 * Provides the basic HTML structure and global providers
 */
import React, { FC, ReactNode } from "react"
import Providers from "./providers";
import { Metadata } from "next";

/**
 * Metadata configuration for the application
 * Sets up default title and template for all pages
 */
export const metadata: Metadata = {
    title: {
        default: "Andromeda Embeddable",
        template: "%s | Embeddable"
    },
}

/**
 * Props interface for the RootLayout component
 * @property {ReactNode} children - Child components to be rendered within the layout
 */
interface Props {
    children?: ReactNode;
}

/**
 * Root layout component that wraps all pages
 * Provides:
 * - Basic HTML structure
 * - Language configuration
 * - Global providers wrapper
 */
const RootLayout = async (props: Props) => {
    const { children } = props;

    return (
        <html lang="en">
            <body>
                <Providers>
                    {children}
                </Providers>
            </body>
        </html>
    )
}

export default RootLayout