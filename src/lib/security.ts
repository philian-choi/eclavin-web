/**
 * Advanced Content Protection Utility
 * Provides XOR-based obfuscation and Base64 encoding.
 * Designed for low-latency client-side decryption.
 */

const SECRET_KEY = 73; // Unique key for XOR obfuscation

/**
 * Obfuscates a string into a scrambed Base64 sequence.
 */
export function obfuscate(text: string): string {
  if (!text) return '';
  
  // XOR each character with the secret key
  const xored = text
    .split('')
    .map((char) => String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY))
    .join('');
    
  // Base64 encode for safe transport
  try {
    return btoa(unescape(encodeURIComponent(xored)));
  } catch (e) {
    return text; // Fallback to plain text on error (graceful degradation)
  }
}

/**
 * Restores the original string from an obfuscated Base64 sequence.
 */
export function deobfuscate(encoded: string): string {
  if (!encoded) return '';
  
  try {
    // Decode Base64 and un-XOR
    const decoded = decodeURIComponent(escape(atob(encoded)));
    return decoded
      .split('')
      .map((char) => String.fromCharCode(char.charCodeAt(0) ^ SECRET_KEY))
      .join('');
  } catch (e) {
    return encoded; // Fallback
  }
}
