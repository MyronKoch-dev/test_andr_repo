/**
 * Configuration module for the application
 * Imports and extends the base configuration from config.json
 */
import { IConfig } from "./lib/app";
import config from "../config.json";

/**
 * Main configuration object that:
 * - Spreads the base config from config.json
 * - Adds timestamps for creation and modification
 * - Sets a fixed application ID
 */
const CONFIG = {
    ...config,
    createdDate: new Date().toISOString(),
    modifiedDate: new Date().toISOString(),
    id: "andromeda"
} as IConfig;

export default CONFIG;

