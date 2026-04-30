import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import { Transition } from '@mantine/core';

import Nui from '../../util/Nui';
import { GetData } from '../../util/NuiEvents';
import { ACCENT, TEXT_PRIMARY, LOGO } from '../../theme';

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
        <Transition mounted={show} transition="fade" duration={600} onExited={onExited}>
            {(styles) => (
                <div style={{
                    ...styles,
                    position: 'absolute',
                    inset: 0,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    zIndex: 1000,
                    pointerEvents: 'all',
                }}>
                    {/* Corner brackets */}
                    {[
                        { top: 28, left: 28, borderTop: `1px solid ${ACCENT}`, borderLeft: `1px solid ${ACCENT}` },
                        { top: 28, right: 28, borderTop: `1px solid ${ACCENT}`, borderRight: `1px solid ${ACCENT}` },
                        { bottom: 28, left: 28, borderBottom: `1px solid ${ACCENT}`, borderLeft: `1px solid ${ACCENT}` },
                        { bottom: 28, right: 28, borderBottom: `1px solid ${ACCENT}`, borderRight: `1px solid ${ACCENT}` },
                    ].map((style, i) => (
                        <div key={i} style={{
                            position: 'absolute',
                            width: 36, height: 36,
                            opacity: 0.4,
                            animation: 'cornerPulse 3s ease-in-out infinite',
                            animationDelay: `${i * 0.6}s`,
                            ...style,
                        }} />
                    ))}

                    {/* Center content */}
                    <div style={{
                        display: 'flex',
                        flexDirection: 'column',
                        alignItems: 'center',
                        animation: 'fadeInUp 0.9s ease',
                        animationFillMode: 'both',
                        animationDelay: '0.15s',
                    }}>
                        {/* Icon logo */}
                        <img
                            src={LOGO}
                            alt="Pulsar"
                            style={{
                                width: 560,
                                maxWidth: '75vw',
                                display: 'block',
                                marginBottom: 48,
                                transform: 'translateX(-10%)',
                            }}
                        />

                        {/* Thin rule */}
                        <div style={{
                            height: 2,
                            width: 320,
                            background: `linear-gradient(90deg, transparent, ${ACCENT}, transparent)`,
                            marginBottom: 36,
                        }} />

                        {/* Press any key */}
                        <div style={{
                            fontSize: 15,
                            letterSpacing: '6px',
                            color: TEXT_PRIMARY,
                            textTransform: 'uppercase',
                            fontWeight: 600,
                            animation: 'blinker 1.6s step-end infinite',
                        }}>
                            Press Any Key
                        </div>
                    </div>
                </div>
            )}
        </Transition>
    );
};
