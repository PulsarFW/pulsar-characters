import React from 'react';
import { useSelector } from 'react-redux';
import { MantineProvider, createTheme } from '@mantine/core';
import { library } from '@fortawesome/fontawesome-svg-core';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import Loader from '../Loader';
import Characters from '../Characters';
import Create from '../Create';
import Spawn from '../Spawn';

const DevToolbar = process.env.NODE_ENV !== 'production'
    ? require('../../dev/DevToolbar').default
    : null;

import { STATE_CHARACTERS, STATE_CREATE, STATE_SPAWN } from '../../util/States';

library.add(fab, fas);

const theme = createTheme({
    fontFamily: 'Source Sans Pro, sans-serif',
    primaryColor: 'brand',
    colors: {
        brand: [
            '#fff8e1', '#ffecb3', '#ffe082', '#ffd54f',
            '#ffca28', '#E5A502', '#cc9100', '#b07d00',
            '#FA5800', '#c94600',
        ],
    },
    components: {
        Modal: {
            styles: {
                content: { background: '#0f0f0f', borderLeft: '4px solid #E5A502' },
                header: { background: '#0f0f0f' },
                overlay: { backdropFilter: 'blur(2px)' },
            },
        },
    },
});

export default () => {
    const hidden = useSelector((state) => state.app.hidden);
    const appState = useSelector((state) => state.app.state);
    const loading = useSelector((state) => state.loader.loading);

    let display;
    switch (appState) {
        case STATE_CHARACTERS: display = <Characters />; break;
        case STATE_CREATE:     display = <Create />;     break;
        case STATE_SPAWN:      display = <Spawn />;      break;
        default:               display = null;           break;
    }

    return (
        <MantineProvider theme={theme} forceColorScheme="dark">
            <style>{`:root { color-scheme: normal !important; } * { box-sizing: border-box; }`}</style>
            {DevToolbar && <DevToolbar />}
            {!hidden && (
                <div style={{ height: '100vh', width: '100vw', color: '#fff', fontFamily: 'Source Sans Pro, sans-serif' }}>
                    {loading ? <Loader /> : display}
                </div>
            )}
        </MantineProvider>
    );
};
