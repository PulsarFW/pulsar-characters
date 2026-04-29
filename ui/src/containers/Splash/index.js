import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Transition } from '@mantine/core';

import Nui from '../../util/Nui';
import { GetData } from '../../util/NuiEvents';
import logo from '../../assets/imgs/logo_banner.png';

export default () => {
    const dispatch = useDispatch();
    const [show, setShow] = useState(true);

    const onExited = () => {
        Nui.send(GetData);
        dispatch({ type: 'LOADING_SHOW', payload: { message: 'Loading Server Data' } });
    };

    useEffect(() => {
        const handler = (e) => {
            if (e.which === 1 || e.which === 13 || e.which === 32) setShow(false);
        };
        ['click', 'keydown', 'keyup'].forEach((ev) => window.addEventListener(ev, handler));
        return () => ['click', 'keydown', 'keyup'].forEach((ev) => window.removeEventListener(ev, handler));
    }, []);

    return (
        <Transition mounted={show} transition="fade" duration={400} onExited={onExited}>
            {(styles) => (
                <div style={{
                    ...styles,
                    height: 'fit-content',
                    width: 800,
                    position: 'absolute',
                    top: 0, bottom: 0, left: 0, right: 0,
                    margin: 'auto',
                    textAlign: 'center',
                    fontSize: 30,
                    color: '#fff',
                    zIndex: 1000,
                    padding: 36,
                    background: '#0f0f0f',
                    borderLeft: '6px solid #E5A502',
                }}>
                    <img src={logo} style={{ maxWidth: 450, width: '100%', borderBottom: '2px solid rgba(255,255,255,0.12)', margin: 'auto' }} />
                    <div style={{ paddingTop: 50 }}>
                        <span style={{ fontSize: '1.5vw', display: 'block' }}>
                            Welcome To <span style={{ color: '#E5A502' }}>Pulsar Framework</span>
                        </span>
                        <span style={{
                            fontSize: '0.75vw',
                            animation: 'blinker 1s linear infinite',
                        }}>
                            <span style={{ fontWeight: 500, color: '#E5A502' }}>ENTER</span>
                            {' / '}
                            <span style={{ fontWeight: 500, color: '#E5A502' }}>SPACE</span>
                            {' / '}
                            <span style={{ fontWeight: 500, color: '#E5A502' }}>LEFT MOUSE</span>
                        </span>
                    </div>
                    <style>{`@keyframes blinker { 50% { opacity: 0.3; } }`}</style>
                </div>
            )}
        </Transition>
    );
};
