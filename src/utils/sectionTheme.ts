/**
 * Section Theme System
 * 
 * Alternates background and text colors for high-contrast "Matcha & Cream" theme.
 * 
 * Light Mode:
 * - Even sections: Cream background (#FDFBF7) with Dark text (#2C3333)
 * - Odd sections: Matcha background (#4A5D4F) with Cream text (#FDFBF7)
 * 
 * Dark Mode:
 * - Even sections: Cosmic Purple (#4c1d95) with White text
 * - Odd sections: Midnight Abyss (#0f172a) with Gray-300 text
 */

interface SectionTheme {
  bgClass: string;
  textClass: string;
  bgVar: 'var(--bg)' | 'var(--bg-alt)';
  textVar: 'var(--text)' | 'var(--text-alt)';
  variant: 'primary' | 'secondary';
  dataAttribute: Record<string, string>;
}

/**
 * Returns theme classes for a section based on its index.
 * 
 * @param index - Section index (even = primary, odd = secondary)
 * @returns Object with background, text classes, and variant data attribute
 * 
 * @example
 * const theme = getSectionTheme(0); // Even - Primary theme
 * // Light: bg-[#FDFBF7] text-[#2C3333]
 * // Dark: bg-[#4c1d95] text-white
 * // Variant: primary
 * 
 * @example
 * const theme = getSectionTheme(1); // Odd - Secondary theme
 * // Light: bg-[#4A5D4F] text-[#FDFBF7]
 * // Dark: bg-[#0f172a] text-gray-300
 * // Variant: secondary (overrides --text CSS variable)
 */
export function getSectionTheme(index: number): SectionTheme {
  const isEven = index % 2 === 0;

  if (isEven) {
    // Primary Theme - Cream in light, Purple in dark
    return {
      bgClass: 'section-bg-primary',
      textClass: 'text-[#2C3333]', // Text handled by CSS variables
      bgVar: 'var(--bg)',
      textVar: 'var(--text)',
      variant: 'primary',
      dataAttribute: { 'data-section-variant': 'primary' },
    };
  } else {
    // Secondary Theme - Matcha in light, Midnight in dark
    return {
      bgClass: 'section-bg-secondary',
      textClass: 'text-[#f8f3ef]', // Warm cream text - handled by CSS variables
      bgVar: 'var(--bg-alt)',
      textVar: 'var(--text-alt)',
      variant: 'secondary',
      dataAttribute: { 'data-section-variant': 'secondary' },
    };
  }
}

/**
 * Returns a combined className string for a section.
 * 
 * @param index - Section index
 * @param additionalClasses - Optional additional Tailwind classes
 * @returns Complete className string
 * 
 * @example
 * <section className={getSectionClassName(0, 'py-20')}>...</section>
 */
export function getSectionClassName(index: number, additionalClasses = ''): string {
  const theme = getSectionTheme(index);
  return `${theme.bgClass} ${theme.textClass} ${additionalClasses}`.trim();
}

/**
 * Returns inline style object using CSS variables.
 * Useful for dynamic theming with CSS custom properties.
 * 
 * @param index - Section index
 * @returns Style object with background and color
 * 
 * @example
 * <section style={getSectionStyle(0)}>...</section>
 */
export function getSectionStyle(index: number): React.CSSProperties {
  const theme = getSectionTheme(index);
  return {
    backgroundColor: theme.bgVar,
    color: theme.textVar,
  };
}
