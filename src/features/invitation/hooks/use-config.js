import { useInvitation } from "@/providers/invitation-provider";

/**
 * Custom hook to access wedding configuration
 * Returns config from API if available, otherwise falls back to static config
 *
 * @returns {object} Wedding configuration data
 *
 * @example
 * const config = useConfig();
 * console.log(config.groomName, config.brideName);
 */
export function useConfig() {
  const { config } = useInvitation();
  return config;
}
