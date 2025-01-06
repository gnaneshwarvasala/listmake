import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}",
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1400px',
      }
    },
    extend: {
      fontFamily: {
        inter: ['Inter', 'sans-serif'],
      },
      colors: {
        'neon-blue': {
          DEFAULT: '#5465ff',
          100: '#000743',
          200: '#000d87',
          300: '#0014ca',
          400: '#0e26ff',
          500: '#5465ff',
          600: '#7482ff',
          700: '#97a1ff',
          800: '#bac1ff',
          900: '#dce0ff'
        },
        'cornflower-blue': {
          DEFAULT: '#788bff',
          100: '#000a4b',
          200: '#001497',
          300: '#001ee2',
          400: '#2f4bff',
          500: '#788bff',
          600: '#95a3ff',
          700: '#afbaff',
          800: '#cad1ff',
          900: '#e4e8ff'
        },
        'jordy-blue': {
          DEFAULT: '#9bb1ff',
          100: '#001252',
          200: '#0023a3',
          300: '#0035f5',
          400: '#476fff',
          500: '#9bb1ff',
          600: '#adbfff',
          700: '#c2cfff',
          800: '#d6dfff',
          900: '#ebefff'
        },
        'periwinkle': {
          DEFAULT: '#bfd7ff',
          100: '#002159',
          200: '#0041b1',
          300: '#0b65ff',
          400: '#649dff',
          500: '#bfd7ff',
          600: '#caddff',
          700: '#d7e6ff',
          800: '#e4eeff',
          900: '#f2f7ff'
        },
        'light-cyan': {
          DEFAULT: '#e2fdff',
          100: '#005960',
          200: '#00b3c0',
          300: '#21f0ff',
          400: '#81f7ff',
          500: '#e2fdff',
          600: '#e7fdff',
          700: '#edfeff',
          800: '#f3feff',
          900: '#f9ffff'
        },
        'primary-dark': '#0077B6',
        'primary': '#0096C7',
        'primary-light': '#00B4D8',
        'secondary': '#48CAEA',
        'accent': '#90E0EF',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))'
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        },
        sidebar: {
          DEFAULT: 'hsl(var(--sidebar-background))',
          foreground: 'hsl(var(--sidebar-foreground))',
          primary: 'hsl(var(--sidebar-primary))',
          'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
          accent: 'hsl(var(--sidebar-accent))',
          'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
          border: 'hsl(var(--sidebar-border))',
          ring: 'hsl(var(--sidebar-ring))'
        }
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)'
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "scale-in": {
          "0%": { transform: "scale(0.95)", opacity: "0" },
          "100%": { transform: "scale(1)", opacity: "1" }
        },
        "bounce-subtle": {
          "0%, 100%": { transform: "translateY(-5%)" },
          "50%": { transform: "translateY(0)" }
        }
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "scale-in": "scale-in 0.2s ease-out",
        "bounce-subtle": "bounce-subtle 2s infinite"
      },
    },
  },
  plugins: [require("tailwindcss-animate")]
} satisfies Config;