/**
 * Get lighter or darken color from hex/rgb color
 * @name colorLuminance
 * @param {string} hex - hex/rgb value of the color
 * @param {number} lum - luminance value in percentage
 * @returns {string} hex color;
 * @example
 * colorLuminance('#ccc', 0.1) // => "#e0e0e0"
 * colorLuminance('#f54', 0.7) // => "#ff9174
 */
export function colorLuminance(hex: string, lum: number) {
  // validate hex string
  hex = String(hex).replace(/[^0-9a-f]/gi, '');
  if (hex.length < 6) {
    hex = hex[0] + hex[0] + hex[1] + hex[1] + hex[2] + hex[2];
  }
  lum = lum || 0;

  // convert to decimal and change luminosity
  let rgb = '#';
  let c;

  for (let i = 0; i < 3; i++) {
    c = parseInt(hex.substr(i * 2, 2), 16);
    c = Math.round(Math.min(Math.max(0, c + c * lum), 255)).toString(16);
    rgb += ('00' + c).substr(c.length);
  }

  return rgb;
}

/**
 * Convert hex color to rgb with transparency if needed
 * @name hexToRGB
 * @param {string} hex   - hex value of color
 * @param {number} alpha - A(alpha/transparency) value of RGBA.
 * @example
 * hexToRGB('#cccccc', 1); // => "rgba(204, 204, 204, 1)"
 * hexToRGB('#ffffff', 0.5); // => "rgba(255, 255, 255, 0.5)"
 */
export function hexToRGB(hex: string, alpha: number) {
  var r = parseInt(hex.slice(1, 3), 16),
    g = parseInt(hex.slice(3, 5), 16),
    b = parseInt(hex.slice(5, 7), 16);

  if (alpha) {
    return 'rgba(' + r + ', ' + g + ', ' + b + ', ' + alpha + ')';
  } else {
    return 'rgb(' + r + ', ' + g + ', ' + b + ')';
  }
}

export default {
  colorLuminance,
  hexToRGB,
};
