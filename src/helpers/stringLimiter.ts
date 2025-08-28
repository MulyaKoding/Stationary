// No React import needed since we're not using JSX

/**
 * Limits a string to a specified length and adds ellipsis if truncated
 * @param string - The input string to limit
 * @param limit - Maximum length of the string (default: 30)
 * @returns Limited string with ellipsis if needed
 */
export default function stringLimiter(
  string: string | null | undefined, 
  limit: number = 30
): string {
  if (!string) return "";
  if (limit < 1) return "";

  const limitedString: string = string.slice(0, limit);

  return `${limitedString}${string.length > limit ? "..." : ""}`;
}

/**
 * Truncates a string and returns truncated string with ellipsis
 * @param string - The input string to truncate
 * @param maxLength - Maximum length before truncation (default: 20)
 * @returns Truncated string with ellipsis if needed
 */
export const truncate = (
  string: string | null | undefined, 
  maxLength: number = 20
): string => {
  if (!string) return "";
  
  const stringLength: number = string.length;
  
  if (stringLength <= maxLength) {
    return string;
  }
  
  return `${string.slice(0, maxLength - 3)}...`;
};