// Syntax scheme
const backgroundColor   = '#303845';
const foregroundColor   = '#D0D4E6';
const cursorColor       = '#2C85F7';
const borderColor       = '#394251';
const colors            = {
      black             : backgroundColor,
      red               : '#E39194',
      green             : '#8FCA9A',
      yellow            : '#F7EFAE',
      blue              : '#77ABE7',
      magenta           : '#CAA6EC',
      cyan              : '#A2C6EF',
      white             : foregroundColor,
      lightBlack        : '#515A6F',
      lightRed          : '#E39194',
      lightGreen        : '#8FCA9A',
      lightYellow       : '#EFAA8E',
      lightBlue         : '#77ABE7',
      lightMagenta      : '#CAA6EC',
      lightCyan         : '#A2C6EF',
      lightWhite        : foregroundColor
};

// Config
exports.decorateConfig = config => {
    return Object.assign({}, config, {
        foregroundColor,
        backgroundColor,
        borderColor,
        colors,
        cursorColor: config.cursorColor || cursorColor,
        cursorShape: config.cursorShape || 'BEAM',
        fontSize: config.fontSize || 12,
        fontFamily: config.fontFamily || '"Fira Code"',
        termCSS: `
            ${config.termCSS || ''}
            ::selection {
                background: #9198A2 !important;
            }
            x-screen x-row {
                font-variant-ligatures: initial;
            }
            span {
                font-weight: normal !important;
            }
        `,
        css: `
            ${config.css || ''}
            ::selection {
                background: #9198A2 !important;
            }
        `
    });
};
