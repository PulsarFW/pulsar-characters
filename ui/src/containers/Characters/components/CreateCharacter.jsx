import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { STATE_CREATE } from '../../../util/States';
import { ACCENT, BG_SLOT, ACCENT_DIM, TEXT_SECONDARY, TEXT_DIM, BORDER_SUBTLE, BORDER_DIM, CARD_WIDTH, CARD_HEIGHT } from '../../../theme';

export default ({ index }) => {
    const dispatch = useDispatch();
    const [hovered, setHovered] = useState(false);

    return (
        <div
            onClick={() => dispatch({ type: 'SET_STATE', payload: { state: STATE_CREATE } })}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                width: CARD_WIDTH,
                height: CARD_HEIGHT,
                flexShrink: 0,
                background: hovered ? 'rgba(0,0,0,0.6)' : BG_SLOT,
                border: `1px dashed ${hovered ? BORDER_DIM : BORDER_SUBTLE}`,
                borderTop: `2px dashed ${hovered ? BORDER_DIM : BORDER_SUBTLE}`,
                transform: `translateY(${hovered ? -7 : 0}px)`,
                transition: 'transform 0.28s cubic-bezier(0.34,1.3,0.64,1), border-color 0.2s ease',
                cursor: 'pointer',
                userSelect: 'none',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                gap: 14,
                animation: 'fadeInUp 0.5s ease',
                animationFillMode: 'both',
                animationDelay: `${index * 0.09}s`,
            }}
        >
            <div style={{
                width: 36,
                height: 36,
                borderRadius: '50%',
                border: `1px solid ${hovered ? ACCENT_DIM : BORDER_DIM}`,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 13,
                color: hovered ? TEXT_SECONDARY : TEXT_DIM,
                transition: 'all 0.2s ease',
            }}>
                <FontAwesomeIcon icon="plus" />
            </div>
            <span style={{
                fontSize: 9,
                letterSpacing: '3px',
                textTransform: 'uppercase',
                color: hovered ? TEXT_SECONDARY : TEXT_DIM,
                fontWeight: 700,
                transition: 'color 0.2s ease',
                textAlign: 'center',
            }}>
                New<br />Character
            </span>
        </div>
    );
};
