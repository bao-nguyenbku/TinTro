import { extendTheme } from 'native-base';

export const theme = extendTheme({
  fontConfig: {
    SF: {
      // 100: {
      //   normal: "Roboto-Light",
      //   italic: "Roboto-LightItalic",
      // },
      // 200: {
      //   normal: "Roboto-Light",
      //   italic: "Roboto-LightItalic",
      // },
      // 300: {
      //   normal: "Roboto-Light",
      //   italic: "Roboto-LightItalic",
      // },
      // 400: {
      //   normal: "Roboto-Regular",
      //   italic: "Roboto-Italic",
      // },
      500: {
        normal: 'SFProDisplay-Medium',
      },
      // 600: {
      //   normal: "Roboto-Medium",
      //   italic: "Roboto-MediumItalic",
      // },
      // Add more variants
      //   700: {
      //     normal: 'Roboto-Bold',
      //   },
      //   800: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
      //   900: {
      //     normal: 'Roboto-Bold',
      //     italic: 'Roboto-BoldItalic',
      //   },
    },
  },

  // Make sure values below matches any of the keys in `fontConfig`
  fonts: {
    heading: 'SF',
    body: 'SF',
    mono: 'SF',
  },
});
