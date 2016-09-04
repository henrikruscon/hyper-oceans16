const throttle = require('lodash.throttle')
const BUSY_TIMEOUT = 700
const BUSY_THROTTLE = BUSY_TIMEOUT / 2

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

exports.decorateBrowserOptions = defaults => {
    const clean = Object.assign({ frame: false }, defaults)
    delete clean.titleBarStyle
    return clean
}

exports.decorateConfig = config => {
    return Object.assign({}, config, {
        foregroundColor,
        backgroundColor,
        borderColor,
        cursorColor,
        colors,
        cursorShape: 'BEAM',
        termCSS: `
            ${config.termCSS || ''}
            ::selection {
                background: #9198A2 !important;
            }
            .cursor-node[focus=true]:not([moving]) {
                animation: blink 1s ease infinite;
            }
            @keyframes blink {
                50% {
                    opacity: 0;
                }
            }
        `,
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
                font-weight: 400;
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
                background-image: url('${__dirname}/icons/close.svg');
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
                color: #EFAA8E;
                animation: pulse 3s ease-in-out infinite;
            }
            @keyframes pulse {
                0% {
                    opacity: 1;
                }
                50% {
                    opacity: 1;
                }
                75% {
                    opacity: 0.5;
                }
	            100% {
                    opacity: 1;
                }
            }
            .tab_tab.tab_hasActivity:hover {
                animation: none !important;
            }
            .tab_tab.tab_hasActivity .tab_icon
            {
                background-image: url('${__dirname}/icons/close_activity.svg') !important;
            }
            .tab_tab.tab_hasActivity .tab_icon:hover
            {
                background-color: #EFAA8E;
                background-image: url('${__dirname}/icons/close.svg') !important;
            }
            .tab_first {
                margin-left: -1px;
                border: 0 !important;
            }
            .tab-service {
                background-repeat: no-repeat;
                background-position: left center;
                transition: background-image 150ms ease;
            }
            .tab-service.gulp {
                padding-left: 16px;
                background-image: url('${__dirname}/icons/gulp.svg');
                background-size: 6px 14px;
            }
            .tab_tab.tab_active .tab-service.gulp, .tab_tab:hover .tab-service.gulp, .tab-service.gulp.title {
                background-image: url('${__dirname}/icons/gulp_active.svg');
            }
            .tab_tab.tab_hasActivity .tab-service.gulp {
                background-image: url('${__dirname}/icons/gulp_activity.svg');
            }
            .tab-service.zsh {
                padding-left: 16px;
                background-image: url('${__dirname}/icons/bolt.svg');
                background-size: 8px 14px;
            }
            .tab_tab.tab_active .tab-service.zsh, .tab_tab:hover .tab-service.zsh, .tab-service.zsh.title {
                background-image: url('${__dirname}/icons/bolt_active.svg');
            }
            .tab_tab.tab_hasActivity .tab-service.zsh {
                background-image: url('${__dirname}/icons/bolt_activity.svg');
            }
            .tab-service.node {
                padding-left: 20px;
                background-image: url('${__dirname}/icons/node.svg');
                background-size: 14px 14px;
            }
            .tab_tab.tab_active .tab-service.node, .tab_tab:hover .tab-service.node, .tab-service.node.title {
                background-image: url('${__dirname}/icons/node_active.svg');
            }
            .tab_tab.tab_hasActivity .tab-service.node {
                background-image: url('${__dirname}/icons/node_activity.svg');
            }
            .tab-service.php {
                padding-left: 20px;
                background-image: url('${__dirname}/icons/php.svg');
                background-size: 14px 10px;
            }
            .tab_tab.tab_active .tab-service.php, .tab_tab:hover .tab-service.php, .tab-service.php.title {
                background-image: url('${__dirname}/icons/php_active.svg');
            }
            .tab_tab.tab_hasActivity .tab-service.php {
                background-image: url('${__dirname}/icons/php_activity.svg');
            }
        `
    })
}

exports.decorateTab = (Tab, { React }) => {
    return class extends Tab {
        render() {
            this.props.text = React.createElement('span', { className: `tab-service ${this.props.text}` }, `${this.props.text}`)
            return React.createElement(Tab, Object.assign({}, this.props, {}))
        }
    }
}

exports.decorateTabs = (Tabs, { React }) => {
    return class extends Tabs {
        render() {
            if (this.props.tabs.length === 1 && typeof this.props.tabs[0].title === 'string') {
                this.props.tabs[0].title = React.createElement('span', { className: `tab-service title ${this.props.tabs[0].title}` }, `${this.props.tabs[0].title}`)
            }
            return React.createElement(Tabs, Object.assign({}, this.props, {}))
        }
    }
}

exports.decorateTerm = (Term, {React, notify}) => {
    return class extends React.Component {
        constructor (props, context) {
            super(props, context)
            this._onTerminal = this._onTerminal.bind(this)
            this._onCursorChange = this._onCursorChange.bind(this)
            this._updateCursorStatus = this._updateCursorStatus.bind(this)
            this._markBusyThrottled = throttle(this._markBusy.bind(this), BUSY_THROTTLE)
            this._markIdle = this._markIdle.bind(this)
        }

        _onTerminal (term) {
            if (this.props.onTerminal) this.props.onTerminal(term)

            this._cursor = term.cursorNode_

            this._observer = new MutationObserver(this._onCursorChange)
            this._observer.observe(this._cursor, {
                attributes: true,
                childList: false,
                characterData: false
            })
        }

        _onCursorChange (mutations) {
            const cursorMoved = mutations.some(m => m.attributeName === 'title')
            if (cursorMoved) {
                this._updateCursorStatus()
            }
        }

        _updateCursorStatus () {
            this._markBusyThrottled()

            clearTimeout(this._markingTimer)
            this._markingTimer = setTimeout(() => {
                this._markIdle()
            }, BUSY_TIMEOUT)
        }

        _markBusy () {
            this._cursor.setAttribute('moving', true)
        }

        _markIdle () {
            this._cursor.removeAttribute('moving')
        }

        render () {
            return React.createElement(Term, Object.assign({}, this.props, {
                onTerminal: this._onTerminal
            }));
        }

        componentWillUnmount () {
            if (this._observer) {
                this._observer.disconnect()
            }
        }
    }
}
