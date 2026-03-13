// color design tokens export
export const tokensDark = {
  grey: {
    0: "#ffffff", 
    10: "#f6f6f6", 
    50: "#f0f0f0", 
    100: "#d7d8da",
    200: "#b0b2b5",
    300: "#888b90",
    400: "#61656b",
    500: "#393e46",
    600: "#2e3238",
    700: "#22252a",
    800: "#17191c",
    900: "#0b0c0e",
    1000: "#000000", 
  },
  primary: {
    100: "#d3d4d6",
    200: "#a7a9ad",
    300: "#7a7e83",
    400: "#4e535a",
    500: "#222831",
    600: "#1b2027",
    700: "#14181d",
    800: "#0e1014",
    900: "#07080a"
  },
  secondary: {
    50: "#f0f0f0", 
    100: "#fcfcfc",
    200: "#f8f8f8",
    300: "#f5f5f5",
    400: "#f1f1f1",
    500: "#eeeeee",
    600: "#bebebe",
    700: "#8f8f8f",
    800: "#5f5f5f",
    900: "#303030"
  },
};

// Function that reverses the color palette
function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}
export const tokensLight = reverseTokens(tokensDark);

// mui theme settings
export const themeSettings = (mode) => {
  return {
    palette: {
      mode: mode,
      ...(mode === "dark"
        ? {
            // DARK MODE PALETTE
            primary: {
              ...tokensDark.primary,
              main: tokensDark.primary[400],
              light: tokensDark.primary[400],
            },
            secondary: {
              ...tokensDark.secondary,
              main: tokensDark.secondary[300],
            },
            neutral: {
              ...tokensDark.grey,
              main: tokensDark.grey[500],
            },
            background: {
              default: tokensDark.primary[600],
              alt: tokensDark.primary[500],
            },
          }
        : {
            // 🔥 REFINED LIGHT MODE (Professional Clean Look)
            primary: {
              ...tokensLight.primary,
              main: "#4cceac", // Custom green brand color
              light: tokensLight.primary[100],
            },
            secondary: {
              ...tokensLight.secondary,
              main: "#2d3748", // Professional Dark Slate
              light: tokensLight.secondary[700],
            },
            neutral: {
              ...tokensLight.grey,
              main: tokensLight.grey[500],
            },
            background: {
              default: "#f4f7fe", // Modern light grey-blue base
              alt: "#ffffff",     // Pure white for cards (makes them "pop")
            },
            text: {
              primary: "#111827", // Rich black for readability
              secondary: "#6b7280", // Muted gray
            }
          }),
    },
    typography: {
      fontFamily: ["Inter", "sans-serif"].join(","),
      fontSize: 12,
      h1: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 40, fontWeight: 700 },
      h2: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 32, fontWeight: 700 },
      h3: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 24, fontWeight: 600 },
      h4: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 20, fontWeight: 600 },
      h5: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 16, fontWeight: 500 },
      h6: { fontFamily: ["Inter", "sans-serif"].join(","), fontSize: 14, fontWeight: 500 },
    },
    // 🔥 COMPONENT OVERRIDES: These fix the "flat" look in light mode
    components: {
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: "16px",
            boxShadow: mode === "light" 
                ? "0px 10px 15px -3px rgba(0,0,0,0.05), 0px 4px 6px -2px rgba(0,0,0,0.02)" 
                : "none",
            border: mode === "light" ? "1px solid #eaedf3" : "none",
            backgroundImage: "none", // Removes MUI default overlay in dark mode
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: "8px",
            textTransform: "none",
            fontWeight: 600,
          },
        },
      },
    },
  };
};