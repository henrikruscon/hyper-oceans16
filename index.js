const backgroundColor = '#303845'
const foregroundColor = '#D0D4E6'
const cursorColor = '#2C85F7'
const borderColor = backgroundColor

const colors = {
    black       : backgroundColor,
    red         : '#E39194',
    green       : '#8FCA9A',
    yellow      : '#F7EFAE',
    blue        : '#77ABE7',
    magenta     : '#CAA6EC',
    cyan        : '#A2C6EF',
    white       : '#EFF1F5',
    lightBlack  : '#515A6F',
    lightRed    : '#E39194',
    lightGreen  : '#8FCA9A',
    lightYellow : '#F7EFAE',
    lightBlue   : '#77ABE7',
    lightMagenta: '#CAA6EC',
    lightCyan   : '#A2C6EF',
    lightWhite  : foregroundColor
}

exports.decorateConfig = config => {
    return Object.assign({}, config, {
        foregroundColor,
        backgroundColor,
        borderColor,
        cursorColor,
        colors,
        css: `
        ${config.css || ''}
        .header_header {
            top: 0;
            right: 0;
            left: 0;
        }
        .tabs_list {
            background-color: #292E38 !important;
            border-bottom-color: #3E4756 !important;
        }
        .tab_tab {
            color: #636A76;
            transition: background 150ms ease;
        }
        .tab_tab:hover {
            color: #FFFFFF;
            background-color: #3E4756;
        }
        .tab_tab.tab_active {
            color: #FFFFFF;
            font-weight: 500;
            background-color: ${backgroundColor};
            border-color: #3E4756 !important;
        }
        .tab_tab.tab_active::before {
            border-bottom-color: ${backgroundColor};
        }
        .tab_icon {
            display: block;
            top: 9px;
            left: 9px;
            width: 16px;
            height: 16px;
            border-radius: 2px;
            background-image: url('${__dirname}/close.svg');
            background-repeat: no-repeat;
            background-size: 9px;
            background-position: center;
            transform: scale(0);
            transition: transform 150ms ease, background 150ms ease;
        }
        .tab_icon:hover {
            background-color: #292E38;
        }
        .tab_tab.tab_active .tab_icon:hover {
            background-color: #505765;
        }
        .tab_tab:hover .tab_icon {
            transform: scale(1);
        }
        .tab_tab.tab_hasActivity {
            color: #EFAA8E !important;
        }
        .tab_tab.tab_hasActivity .tab_icon
        {
            background-image: url('${__dirname}/close_activity.svg') !important;
        }
        .tab_tab.tab_hasActivity .tab_icon:hover
        {
            background-color: #EFAA8E !important;
            background-image: url('${__dirname}/close.svg') !important;
        }
        `
    })
}
