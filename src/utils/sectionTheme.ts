/**
 * Section Theme System
 * 
 * Alternates background colors using core CSS variables for a clean visual rhythm.
 * 
 * Pattern:
 * - Even sections (0, 2, 4...): Use --bg (primary background)
 * - Odd sections (1, 3, 5...): Use --bg-alt (secondary background)
 * 
 * This creates a breathing, alternating pattern that guides the user through the scroll narrative.
 */

interface SectionTheme {
  bgVar: 'var(--bg)' | 'var(--bg-alt)';
  textVar: 'var(--text)' | 'var(--text-alt)';
  variant: 'primary' | 'secondary';
  dataAttribute: Record<string, string>;
  style: React.CSSProperties;
}

/**
 * Returns theme configuration for a section based on its index.
 * 
 * @param index - Section index (even = --bg, odd = --bg-alt)
 * @returns Object with CSS variables, variant, and inline style
 * 
 * @example
 * // Even section (0) - Primary background
 * const theme = getSectionTheme(0);
 * // Returns: { bgVar: 'var(--bg)', textVar: 'var(--text)', style: {...} }
 * 
 * @example
 * // Odd section (1) - Alternate background
 * const theme = getSectionTheme(1);
 * // Returns: { bgVar: 'var(--bg-alt)', textVar: 'var(--text-alt)', style: {...} }
 */
export function getSectionTheme(index: number): SectionTheme {
  const isEven = index % 2 === 0;

  if (isEven) {
    // Primary Theme - Uses --bg
    return {
      bgVar: 'var(--bg)',
      textVar: 'var(--text)',
      variant: 'primary',
      dataAttribute: { 'data-section-variant': 'primary' },
      style: {
        backgroundColor: 'var(--bg)',
        color: 'var(--text)',
      },
    };
  } else {
    // Secondary Theme - Uses --bg-alt
    return {
      bgVar: 'var(--bg-alt)',
      textVar: 'var(--text-alt)',
      variant: 'secondary',
      dataAttribute: { 'data-section-variant': 'secondary' },
      style: {
        backgroundColor: 'var(--bg-alt)',
        color: 'var(--text-alt)',
      },
    };
  }
}

/**
 * Returns inline style object using CSS variables.
 * This is now the primary way to apply section themes.
 * 
 * @param index - Section index
 * @returns Style object with background and color CSS variables
 * 
 * @example
 * <section style={getSectionStyle(0)}>...</section>
 */
export function getSectionStyle(index: number): React.CSSProperties {
  const theme = getSectionTheme(index);
  return theme.style;
}
