/**
 * React Query client configuration module
 * Sets up a QueryClient instance with custom defaults and error handling
 */
import { shortenString } from "@/utils/string";
import { createStandaloneToast } from "@chakra-ui/react";
import { QueryClient } from "@tanstack/react-query";

/**
 * Create a standalone toast instance for error notifications
 * This allows showing toasts outside of the Chakra Provider context
 */
const { toast } = createStandaloneToast()

/**
 * React Query client instance with custom configuration
 * Features:
 * - Custom stale time for query caching (1 minute)
 * - Global error handling for mutations
 * - Automatic error toast notifications
 */
const reactQueryClient = new QueryClient({
    defaultOptions: {
        queries: {
            // Cache data for 1 minute before considering it stale
            staleTime: 1 * 60 * 1000
        },
        mutations: {
            /**
             * Global error handler for mutations
             * Handles different error types and displays toast notifications
             * @param err - The error object from the mutation
             */
            onError: (err: unknown) => {
                let error: Error;
                // Handle different error object structures
                if (typeof err === 'object' && err !== null && 'error' in err) {
                    error = (err as { error: Error }).error;
                } else if (err instanceof Error) {
                    error = err;
                } else {
                    error = new Error('Unknown error occurred');
                }

                const message = error.message ?? "No Description";
                // Display error toast with shortened message
                toast({
                    description: shortenString(message, 100),
                    status: "error",
                    position: "top-right",
                    duration: 3000,
                    isClosable: true
                });
            }
        }
    }
})

export default reactQueryClient