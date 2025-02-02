/**
 * GraphQL client configuration module
 * Sets up Apollo Client with custom caching and type policies
 */
import { StrictTypedTypePolicies, TypedFieldPolicy } from "@andromedaprotocol/gql";
import { ApolloClient, InMemoryCache } from "@apollo/client";

/**
 * Apollo Client instance configuration
 * Features:
 * - Custom GraphQL endpoint from environment variables
 * - SSR mode enabled with fetch delay
 * - Cache-first fetch policy
 * - Network status change notifications
 * - Custom type policies for complex data management
 */
export const apolloClient = new ApolloClient({
  uri: process.env.NEXT_PUBLIC_GRAPHQL_ENDPOINT,
  'defaultOptions': {
    'query': {
      'notifyOnNetworkStatusChange': true,
      'fetchPolicy': 'cache-first'
    }
  },
  ssrMode: true,
  ssrForceFetchDelay: 500,
  cache: new InMemoryCache({
    typePolicies: {
      ...TypedFieldPolicy,
      /**
       * Chain configuration type policy
       * Uses chainId as the unique identifier
       */
      ChainConfig: {
        keyFields: ['chainId']
      },
      /**
       * Chain config query policy
       * Enables merging of query results
       */
      ChainConfigQuery: {
        merge: true
      },
      /**
       * Accounts query policy with custom field handling
       * Specifically manages the assets field with pagination support
       */
      AccountsQuery: {
        fields: {
          assets: {
            // Key arguments for cache identification
            keyArgs: ['walletAddress'],

            /**
             * Custom merge function for handling paginated assets
             * @param existing - Current cached data
             * @param incoming - New data to merge
             * @param args - Query arguments including offset
             * @returns Merged array of assets
             */
            merge(existing, incoming, { args }) {
              const offset = args?.offset ?? 0;
              console.log(args?.offset, "ARGS", incoming, existing)
              const merged = existing ? existing.slice(0, offset) : [];
              merged.push(...incoming)
              return merged;
            },
          }
        }
      },
      /**
       * Asset result type policy
       * Uses combination of address, name, and chainId as unique identifier
       */
      AssetResult: {
        keyFields: ['address', 'name', 'chainId']
      },
      /**
       * NFT info type policy
       * Uses tokenId as unique identifier
       */
      NftInfo: {
        keyFields: ['tokenId']
      }
    } as StrictTypedTypePolicies
  }),
});
