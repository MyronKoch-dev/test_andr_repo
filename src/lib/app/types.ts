/**
 * Core type definitions for the application
 * Uses Zod for runtime type validation and TypeScript type inference
 */
import { z } from "zod"

/**
 * Social sharing URLs schema and type
 * Currently supports Twitter sharing
 */
export type IShareUrls = z.infer<typeof ShareUrlsSchema>
export const ShareUrlsSchema = z.object({
    twitter: z.string().optional()
})

/**
 * Base collection schema and type
 * Common properties shared by all collection types
 */
export type IBaseCollection = z.infer<typeof BaseCollectionSchema>
export const BaseCollectionSchema = z.object({
    id: z.string(),
    name: z.string(),
    description: z.string().optional(),
}).merge(ShareUrlsSchema)

/**
 * Collection type enumeration
 * Defines the available types of collections in the system
 */
export const CollectionTypeSchema = z.enum([
    "embeddables-auction",
    "embeddables-marketplace",
    "embeddables-crowdfund",
    "embeddables-exchange"
])
export const ICollectionType = CollectionTypeSchema.enum

/**
 * Auction collection schema and type
 * Represents collections that support NFT auctions
 */
export type IAuctionCollection = z.infer<typeof AuctionCollectionSchema>;
export const AuctionCollectionSchema = z.object({
    auction: z.string(),
    cw721: z.string(),
    featured: z.string().optional(),
    type: z.literal(CollectionTypeSchema.enum["embeddables-auction"])
}).merge(BaseCollectionSchema)

/**
 * Marketplace collection schema and type
 * Represents collections that support NFT marketplace functionality
 */
export type IMarketplaceCollection = z.infer<typeof MarketplaceCollectionSchema>;
export const MarketplaceCollectionSchema = z.object({
    marketplace: z.string(),
    cw721: z.string(),
    featured: z.string().optional(),
    type: z.literal(CollectionTypeSchema.enum["embeddables-marketplace"])
}).merge(BaseCollectionSchema)

/**
 * Crowdfund collection schema and type
 * Represents collections that support crowdfunding functionality
 */
export type ICrowdfundCollection = z.infer<typeof CrowdfundCollectionSchema>;
export const CrowdfundCollectionSchema = z.object({
    crowdfund: z.string(),
    cw721: z.string(),
    featured: z.string().optional(),
    type: z.literal(CollectionTypeSchema.enum["embeddables-crowdfund"]),
}).merge(BaseCollectionSchema)

/**
 * Exchange collection schema and type
 * Represents collections that support token exchange functionality
 */
export type IExchangeCollection = z.infer<typeof ExchangeCollectionSchema>;
export const ExchangeCollectionSchema = z.object({
    exchange: z.string(),
    cw20: z.string(),
    type: z.literal(CollectionTypeSchema.enum["embeddables-exchange"]),
}).merge(BaseCollectionSchema)

/**
 * Type aliases for specific collection categories
 * CW20: Collections supporting fungible token exchange
 * CW721: Collections supporting non-fungible token operations
 */
export type ICollectionCw20 = IExchangeCollection;
export type ICollectionCw721 = IAuctionCollection | IMarketplaceCollection | ICrowdfundCollection;

/**
 * Union of all collection types
 * Used for handling any type of collection in a generic way
 */
export const CollectionSchema = z.union([AuctionCollectionSchema, MarketplaceCollectionSchema, CrowdfundCollectionSchema, ExchangeCollectionSchema]);
export type ICollection = z.infer<typeof CollectionSchema>;

/**
 * Configuration schema and type
 * Defines the structure of the application's configuration
 * Includes chain information, collections, and metadata
 */
export type IConfig = z.infer<typeof ConfigSchema>
export const ConfigSchema = z.object({
    name: z.string(),
    chainId: z.string(),
    coinDenom: z.string(),
    collections: z.array(CollectionSchema),
    id: z.string(),
    createdDate: z.string(),
    modifiedDate: z.string(),
    banner: z.string().optional(),
    description: z.string().optional(),
}).merge(ShareUrlsSchema)