import { create } from '@storybook/theming';

const themeRed = '#FF5548';
const themeBg = '#1B1C1D';
 
export default create({
  base: 'dark',
  // Typography
  fontBase: '"Open Sans", sans-serif',
  fontCode: 'monospace',
 
  brandTitle: 'Rishabh Anand',
  brandUrl: 'https://rishabh-anand.com',
  brandImage: './RA_Final_logo.svg',
  brandTarget: '_self',
 
  //
  colorPrimary: '#000',
  colorSecondary: themeRed,
 
  // UI
  appBg: themeBg,
  appContentBg: themeBg,
  appPreviewBg: themeBg,
  appBorderColor: themeRed,
  appBorderRadius: 4,
 
  // Text colors
  textColor: themeRed,
  textInverseColor: '#ffffff',
 
  // Toolbar default and active colors
  barTextColor: themeRed,
  // barSelectedColor: '#585C6D',
  // barHoverColor: '#585C6D',
  barBg: themeBg,
 
  // Form colors
  // inputBg: '#ffffff',
  // inputBorder: '#10162F',
  // inputTextColor: '#10162F',
  // inputBorderRadius: 2,
});