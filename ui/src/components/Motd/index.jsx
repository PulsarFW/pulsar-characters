import React from 'react';
import { ACCENT, ACCENT_DIM, BG_BASE, TEXT_PRIMARY } from '../../theme';

export default ({ message }) => (
    <div style={{
        position: 'absolute',
        top: 24,
        left: 24,
        height: 36,
        width: 'fit-content',
        maxWidth: 520,
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'stretch',
        zIndex: 10,
        background: BG_BASE,
        borderLeft: `2px solid ${ACCENT}`,
        animation: 'slideInLeft 0.4s ease',
        animationFillMode: 'both',
    }}>
        <span style={{
            fontSize: 9,
            letterSpacing: '2.5px',
            textTransform: 'uppercase',
            color: ACCENT,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
            padding: '0 10px',
            borderRight: `1px solid ${ACCENT_DIM}`,
            flexShrink: 0,
        }}>
            MOTD
        </span>
        <span style={{
            fontSize: 13,
            color: TEXT_PRIMARY,
            display: 'flex',
            alignItems: 'center',
            padding: '0 14px',
            letterSpacing: '0.3px',
            whiteSpace: 'nowrap',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
        }}>
            {message}
        </span>
    </div>
);
