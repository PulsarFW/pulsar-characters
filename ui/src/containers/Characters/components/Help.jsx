import React from 'react';

const GOLD = '#E5A502';

export default () => (
    <div style={{
        position: 'absolute',
        bottom: 0,
        left: 0,
        right: 0,
        margin: 'auto',
        height: 40,
        width: 'fit-content',
        pointerEvents: 'none',
        display: 'flex',
        zIndex: 1,
        background: 'rgba(15,15,15,0.8)',
        borderLeft: '4px solid #247ba5',
    }}>
        <small style={{ fontSize: 12, display: 'block', lineHeight: '40px', padding: '0 5px', color: '#aaa' }}>
            HELP
        </small>
        <div style={{
            fontSize: 18,
            lineHeight: '40px',
            textShadow: '0 0 5px #000',
            paddingLeft: 5,
            paddingRight: 15,
            borderLeft: '1px solid rgba(255,255,255,0.12)',
            display: 'flex',
            gap: 6,
            alignItems: 'center',
        }}>
            <span style={{ color: GOLD, fontWeight: 'bold' }}>Double Click</span>
            To Play As Character.
            <span style={{ color: GOLD, fontWeight: 'bold' }}>Right Click</span>
            To Delete Character
        </div>
    </div>
);
