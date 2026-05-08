/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#05050a",
          900: "#070712",
          850: "#0b0b19"
        },
        blood: {
          600: "#ef4444",
          700: "#dc2626",
          800: "#b91c1c"
        },
        neon: {
          red: "#ff2a2a",
          crimson: "#ff0033",
          ember: "#ff6b1a",
          pink: "#ff3d7f"
        }
      },
      boxShadow: {
        glow: "0 0 0 1px rgba(255,0,51,.22), 0 0 26px rgba(239,68,68,.18)"
      },
      backgroundImage: {
        "radial-neon":
          "radial-gradient(1200px 620px at 18% 0%, rgba(255,0,51,.22), transparent 60%), radial-gradient(900px 520px at 82% 18%, rgba(239,68,68,.14), transparent 55%), radial-gradient(700px 520px at 55% 85%, rgba(255,107,26,.08), transparent 55%)"
      }
    }
  },
  plugins: []
};

