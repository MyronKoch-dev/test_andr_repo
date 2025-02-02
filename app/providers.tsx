/**
 * Client-side providers component that wraps the application with various context providers
 * Includes providers for:
 * - React Query (data fetching)
 * - Apollo Client (GraphQL)
 * - Chakra UI (UI components and theming)
 * - Global Modal state
 */
"use client"
import { apolloClient } from "@/lib/graphql";
import reactQueryClient from "@/lib/react-query/client";
import { GlobalModalProvider } from "@/modules/modals";
import theme, { ThemeStorageManager } from "@/theme";
import { ApolloProvider } from "@apollo/client";
import { CacheProvider } from "@chakra-ui/next-js";
import { ChakraProvider } from "@chakra-ui/react";
import { QueryClient } from "@cosmjs/stargate";
import { QueryClientProvider } from "@tanstack/react-query";
import React, { FC, ReactNode } from "react"

/**
 * Props interface for the Providers component
 * @property {ReactNode} children - Child components to be wrapped with the providers
 */
interface Props {
    children?: ReactNode;
}

/**
 * Providers component that sets up the application's context providers
 * The providers are nested in a specific order to ensure proper functionality:
 * 1. React Query for data fetching and caching
 * 2. Apollo Client for GraphQL operations
 * 3. Chakra UI for theming and components
 * 4. Global Modal system for application-wide modals
 */
const Providers: FC<Props> = (props) => {
    const { children } = props;

    return (
        <QueryClientProvider client={reactQueryClient}>
            <ApolloProvider client={apolloClient}>
                <CacheProvider>
                    <ChakraProvider theme={theme} colorModeManager={ThemeStorageManager}>
                        <GlobalModalProvider>
                            {children}
                        </GlobalModalProvider>
                    </ChakraProvider>
                </CacheProvider>
            </ApolloProvider>
        </QueryClientProvider>
    )
}

export default Providers