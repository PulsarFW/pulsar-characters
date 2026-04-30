import React from 'react';
import { useSelector } from 'react-redux';

import { ACCENT, TEXT_DIM, LOGO } from '../../theme';

export default () => {
    const loading = useSelector((state) => state.loader.loading);
    const message = useSelector((state) => state.loader.message);

    if (!loading) return null;

    return (
        <div style={{
            position: 'absolute',
            inset: 0,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 900,
            pointerEvents: 'none',
        }}>
            <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                gap: 0,
                animation: 'fadeInUp 0.5s ease',
                animationFillMode: 'both',
            }}>
                {/* Logo */}
                <img
                    src={LOGO}
                    alt="Pulsar"
                    style={{
                        width: 460,
                        maxWidth: '65vw',
                        display: 'block',
                        marginBottom: 36,
                        transform: 'translateX(-10%)',
                    }}
                />

                {/* Segmented loading bar */}
                <div style={{
                    width: 460,
                    maxWidth: '65vw',
                    display: 'flex',
                    gap: 3,
                    marginBottom: 18,
                }}>
                    {Array.from({ length: 16 }).map((_, i) => (
                        <div
                            key={i}
                            style={{
                                flex: 1,
                                height: 2,
                                background: ACCENT,
                                opacity: 0.15,
                                animation: 'segmentPulse 1.6s ease-in-out infinite',
                                animationDelay: `${i * 0.1}s`,
                            }}
                        />
                    ))}
                </div>

                {/* Message */}
                <div style={{
                    fontSize: 13,
                    letterSpacing: '5px',
                    textTransform: 'uppercase',
                    color: TEXT_DIM,
                    fontWeight: 600,
                }}>
                    {message}
                </div>
            </div>

            <style>{`
                @keyframes segmentPulse {
                    0%, 100% { opacity: 0.1; }
                    50% { opacity: 0.7; }
                }
            `}</style>
        </div>
    );
};
