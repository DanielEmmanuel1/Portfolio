# Custom Fonts Guide

This project includes a comprehensive font system with Google Fonts, including cursive fonts, italic styles, and various weights. All fonts are optimized for performance and include proper fallbacks.

## Available Fonts

### Modern Sans-Serif Fonts
- **Inter** - Modern, clean sans-serif (default body font)
- **Poppins** - Geometric sans-serif, great for headings
- **Roboto** - Clean, readable sans-serif
- **Open Sans** - Humanist sans-serif
- **Montserrat** - Modern geometric sans-serif
- **Lato** - Humanist sans-serif
- **Raleway** - Elegant sans-serif
- **Geist Sans** - Modern system font

### Serif Fonts
- **Playfair Display** - Elegant serif, perfect for display text

### Cursive & Script Fonts
- **Dancing Script** - Elegant cursive with multiple weights (400, 500, 600, 700)
- **Great Vibes** - Romantic, flowing script
- **Pacifico** - Fun and casual script
- **Satisfy** - Handwritten style
- **Kaushan Script** - Artistic script
- **Allura** - Sophisticated script
- **Alex Brush** - Signature style
- **Tangerine** - Delicate script (400, 700)
- **Lobster** - Bold and fun
- **Caveat** - Natural handwriting (400, 500, 600, 700)
- **Indie Flower** - Casual handwritten
- **Shadows Into Light** - Chalk-like handwriting
- **Architects Daughter** - Architectural handwriting
- **Gloria Hallelujah** - Religious script
- **Patrick Hand** - Friendly handwriting
- **Rock Salt** - Chalk style
- **Covered By Your Grace** - Graceful script
- **Kalam** - Indian handwriting (300, 400, 700)
- **Just Another Hand** - Casual script
- **Homemade Apple** - Apple-inspired script
- **Sacramento** - California-style script
- **Marck Script** - Russian-style script
- **Yellowtail** - Bold script
- **Srisakdi** - Thai-inspired (400, 700)
- **Calligraffitti** - Graffiti style
- **Reenie Beanie** - Childlike handwriting
- **Over the Rainbow** - Whimsical script
- **Amatic SC** - Hand-drawn style (400, 700)
- **Shadows Into Light Two** - Improved chalk style
- **Coming Soon** - Casual handwriting

### Display & Decorative Fonts
- **Bebas Neue** - Bold display font
- **Oswald** - Clean and modern (200-700)
- **Anton** - Strong and impactful
- **Righteous** - Futuristic display
- **Orbitron** - Sci-fi tech (400-900)
- **Audiowide** - Retro gaming
- **Exo 2** - Modern tech (100-900)
- **Nunito** - Rounded sans-serif (200-900)
- **Quicksand** - Geometric sans-serif (300-700)
- **Comfortaa** - Rounded comfort font (300-700)
- **Bangers** - Comic book style
- **Permanent Marker** - Handwritten marker
- **Indie Flower** - Casual handwritten
- **Rock Salt** - Chalk style

### Monospace Fonts
- **Geist Mono** - Modern monospace
- **VT323** - Retro terminal
- **Press Start 2P** - Gaming pixel font
- **Fira Code** - Programming with ligatures (300-700)
- **JetBrains Mono** - IDE-style (100-800)
- **Source Code Pro** - Clean code font (200-900)
- **IBM Plex Mono** - Professional (100-700)
- **Space Mono** - Spaced out (400, 700)
- **Ubuntu Mono** - Ubuntu-style (400, 700)
- **Anonymous Pro** - Classic terminal (400, 700)
- **Courier Prime** - Modern Courier (400, 700)
- **Inconsolata** - Clean monospace (200-900)

## How to Use Fonts

### 1. CSS Classes (Recommended)

You can use the predefined CSS classes in your components:

```tsx
// Modern Sans-Serif
<div className="font-inter">Inter font</div>
<div className="font-poppins">Poppins font</div>
<div className="font-roboto">Roboto font</div>
<div className="font-montserrat">Montserrat font</div>

// Serif
<div className="font-playfair">Playfair Display font</div>

// Cursive & Script Fonts
<div className="font-dancing-script">Dancing Script - Elegant cursive</div>
<div className="font-great-vibes">Great Vibes - Romantic script</div>
<div className="font-pacifico">Pacifico - Fun and casual</div>
<div className="font-satisfy">Satisfy - Handwritten style</div>
<div className="font-kaushan-script">Kaushan Script - Artistic</div>
<div className="font-allura">Allura - Sophisticated script</div>
<div className="font-alex-brush">Alex Brush - Signature style</div>
<div className="font-tangerine">Tangerine - Delicate script</div>
<div className="font-lobster">Lobster - Bold and fun</div>
<div className="font-caveat">Caveat - Natural handwriting</div>

// Display & Decorative
<div className="font-bebas-neue">Bebas Neue - Bold display</div>
<div className="font-oswald">Oswald - Clean and modern</div>
<div className="font-anton">Anton - Strong and impactful</div>
<div className="font-righteous">Righteous - Futuristic</div>
<div className="font-orbitron">Orbitron - Sci-fi tech</div>
<div className="font-audiowide">Audiowide - Retro gaming</div>
<div className="font-bangers">Bangers - Comic book style</div>
<div className="font-permanent-marker">Permanent Marker - Handwritten</div>

// Monospace
<div className="font-vt323">VT323 - Retro terminal</div>
<div className="font-press-start-2p">Press Start 2P - Gaming</div>
<div className="font-fira-code">Fira Code - Programming</div>
<div className="font-jetbrains-mono">JetBrains Mono - IDE style</div>
<div className="font-source-code-pro">Source Code Pro - Clean code</div>
<div className="font-space-mono">Space Mono - Spaced out</div>
```

### 2. Font Weights

```tsx
// Available weights for fonts that support them
<div className="font-dancing-script font-normal">Normal (400)</div>
<div className="font-dancing-script font-medium">Medium (500)</div>
<div className="font-dancing-script font-semibold">Semi Bold (600)</div>
<div className="font-dancing-script font-bold">Bold (700)</div>

// For fonts with more weights
<div className="font-poppins font-thin">Thin (100)</div>
<div className="font-poppins font-extralight">Extra Light (200)</div>
<div className="font-poppins font-light">Light (300)</div>
<div className="font-poppins font-normal">Normal (400)</div>
<div className="font-poppins font-medium">Medium (500)</div>
<div className="font-poppins font-semibold">Semi Bold (600)</div>
<div className="font-poppins font-bold">Bold (700)</div>
<div className="font-poppins font-extrabold">Extra Bold (800)</div>
<div className="font-poppins font-black">Black (900)</div>
```

### 3. Typography Scale

```tsx
<div className="text-xs">Extra Small (0.75rem)</div>
<div className="text-sm">Small (0.875rem)</div>
<div className="text-base">Base (1rem)</div>
<div className="text-lg">Large (1.125rem)</div>
<div className="text-xl">Extra Large (1.25rem)</div>
<div className="text-2xl">2XL (1.5rem)</div>
<div className="text-3xl">3XL (1.875rem)</div>
<div className="text-4xl">4XL (2.25rem)</div>
<div className="text-5xl">5XL (3rem)</div>
<div className="text-6xl">6XL (3.75rem)</div>
<div className="text-7xl">7XL (4.5rem)</div>
<div className="text-8xl">8XL (6rem)</div>
<div className="text-9xl">9XL (8rem)</div>
```

### 4. Predefined Typography Combinations

```tsx
// Headings
<h1 className="heading-primary">Primary Heading</h1>
<h2 className="heading-secondary">Secondary Heading</h2>
<h3 className="heading-tertiary">Tertiary Heading</h3>

// Body text
<p className="body-text">Regular body text</p>
<p className="body-text-large">Large body text</p>
<p className="caption">Caption text</p>

// Monospace
<code className="mono-text">Code text</code>
```

### 5. Font Combinations (from fonts.ts)

```tsx
import { fontCombinations } from './fonts';

// Use predefined combinations
<h1 className={fontCombinations.heading.primary}>Large Heading</h1>
<h2 className={fontCombinations.heading.secondary}>Medium Heading</h2>
<h3 className={fontCombinations.heading.cursive}>Cursive Heading</h3>
<h4 className={fontCombinations.heading.display}>Display Heading</h4>
<h5 className={fontCombinations.heading.tech}>Tech Heading</h5>

<p className={fontCombinations.body.regular}>Body text</p>
<p className={fontCombinations.body.cursive}>Cursive body text</p>
<p className={fontCombinations.body.handwritten}>Handwritten body text</p>

<code className={fontCombinations.mono.code}>Code snippet</code>
<code className={fontCombinations.mono.retro}>Retro terminal</code>
<code className={fontCombinations.mono.gaming}>Gaming style</code>

<div className={fontCombinations.decorative.signature}>Signature style</div>
<div className={fontCombinations.decorative.handwritten}>Handwritten</div>
<div className={fontCombinations.decorative.marker}>Marker style</div>
<div className={fontCombinations.decorative.chalk}>Chalk style</div>
```

## Font Pairing Suggestions

### Romantic & Elegant
- **Headings**: Great Vibes, Dancing Script
- **Body**: Inter, Open Sans

### Modern & Professional
- **Headings**: Poppins, Montserrat
- **Body**: Inter, Roboto

### Creative & Fun
- **Headings**: Lobster, Bangers, Pacifico
- **Body**: Quicksand, Nunito

### Tech & Futuristic
- **Headings**: Orbitron, Righteous, Anton
- **Body**: Exo 2, Roboto

### Handwritten & Casual
- **Headings**: Caveat, Indie Flower, Patrick Hand
- **Body**: Comfortaa, Nunito

### Gaming & Retro
- **Headings**: Press Start 2P, VT323, Bebas Neue
- **Body**: Space Mono, Fira Code

### Signature & Personal
- **Headings**: Alex Brush, Allura, Sacramento
- **Body**: Dancing Script, Satisfy

## Best Practices

1. **Use 2-3 fonts maximum** per design for consistency
2. **Pair fonts thoughtfully** - contrast is key
3. **Consider readability** - especially for body text
4. **Test on different devices** - fonts may render differently
5. **Use appropriate weights** - don't overload with too many weights
6. **Optimize for performance** - only load the weights you need

## Performance Notes

- All Google Fonts are automatically optimized by Next.js
- Fonts are preloaded for better performance
- Font loading is optimized to prevent layout shifts
- Cursive and script fonts may take slightly longer to load

## Troubleshooting

### Font Not Loading
1. Check if the font class is properly applied
2. Verify the font variable is included in `fontVariables`
3. Ensure the CSS class is defined in `globals.css`

### Font Weights Not Working
1. Make sure the weight is included in the font configuration
2. Check if the weight is available for the specific font
3. Verify the CSS class is properly defined

### Performance Issues
1. Reduce the number of font weights loaded
2. Consider using system fonts for fallbacks
3. Optimize font file sizes (use WOFF2 format)
