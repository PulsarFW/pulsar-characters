import React from 'react';

export default ({ message }) => (
    <div style={{
        position: 'absolute',
        top: '5%',
        left: 0,
        height: 40,
        width: 'fit-content',
        pointerEvents: 'none',
        display: 'flex',
        zIndex: 1,
        background: 'rgba(15,15,15,0.8)',
        borderLeft: '4px solid #247ba5',
    }}>
        <small style={{ fontSize: 12, display: 'block', lineHeight: '40px', padding: '0 5px', color: '#aaa' }}>
            MOTD
        </small>
        <div style={{
            fontSize: 18,
            lineHeight: '40px',
            textShadow: '0 0 5px #000',
            paddingLeft: 15,
            paddingRight: 15,
            borderLeft: '1px solid rgba(255,255,255,0.12)',
            color: '#fff',
        }}>
            {message}
        </div>
    </div>
);
