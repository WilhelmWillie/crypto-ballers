const BASE_SPACING = 4;

const theme = {
  font: "'Work Sans', sans-serif",
  colors: {
    dark: '#393D3F',
    light: '#EFE9F4',
    red: '#EE6352',
    green: '#57A773',
    blue: '#08B2E3',
  },
  spacing: {
    XS: BASE_SPACING,
    S: BASE_SPACING * 2,
    M: BASE_SPACING * 4,
    L: BASE_SPACING * 8,
    XL: BASE_SPACING * 16,
    XXL: BASE_SPACING * 32,
  },
  typography: {
    base: {
      fontSize: 18,
      fontWeight: 400,
      lineHeight: 1.5,
    },
    header1: {
      fontSize: 72,
      fontWeight: 700,
      lineHeight: 1.5,
    },
    header2: {
      fontSize: 58,
      fontWeight: 600,
      lineHeight: 1.5,
    },
    header3: {
      fontSize: 42,
      fontWeight: 500,
      lineHeight: 1.5,
    }
  }
}

export default theme;