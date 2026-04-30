import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SelectSpawn } from '../../../util/NuiEvents';
import Nui from '../../../util/Nui';
import { ACCENT, BG_ACTIVE, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_FAINT, BORDER_SUBTLE } from '../../../theme';

export default ({ spawn, onPlay, index }) => {
    const dispatch = useDispatch();
    const selected = useSelector((state) => state.spawn.selected);
    const [hovered, setHovered] = useState(false);

    const isActive = selected?.id === spawn?.id;

    const onClick = () => {
        Nui.send(SelectSpawn, { spawn });
        dispatch({ type: 'SELECT_SPAWN', payload: spawn });
    };

    return (
        <div
            onClick={onClick}
            onDoubleClick={onPlay}
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            style={{
                display: 'flex',
                alignItems: 'center',
                height: 54,
                position: 'relative',
                background: isActive ? BG_ACTIVE : hovered ? 'rgba(255,255,255,0.03)' : 'transparent',
                borderBottom: `1px solid ${BORDER_SUBTLE}`,
                cursor: 'pointer',
                userSelect: 'none',
                transition: 'background 0.15s ease',
                animation: 'slideInLeft 0.3s ease',
                animationFillMode: 'both',
                animationDelay: `${index * 0.05}s`,
            }}
        >
            {/* Active left bar */}
            <div style={{
                position: 'absolute',
                left: 0, top: 0, bottom: 0,
                width: 2,
                background: ACCENT,
                opacity: isActive ? 1 : 0,
                transition: 'opacity 0.15s ease',
            }} />

            {/* Icon */}
            <div style={{
                width: 54,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 12,
                color: isActive ? ACCENT : hovered ? TEXT_SECONDARY : TEXT_FAINT,
                flexShrink: 0,
                transition: 'color 0.15s ease',
            }}>
                <FontAwesomeIcon icon={spawn.icon || 'location-dot'} />
            </div>

            {/* Label */}
            <div style={{ flex: 1, paddingRight: 16 }}>
                <div style={{
                    fontSize: 13,
                    fontWeight: isActive ? 600 : 400,
                    color: isActive ? TEXT_PRIMARY : hovered ? TEXT_SECONDARY : TEXT_FAINT,
                    transition: 'color 0.15s ease',
                }}>
                    {spawn.label}
                </div>
                {isActive && (
                    <div style={{
                        fontSize: 9,
                        color: TEXT_FAINT,
                        letterSpacing: '1.5px',
                        textTransform: 'uppercase',
                        marginTop: 2,
                    }}>
                        Double click to play
                    </div>
                )}
            </div>
        </div>
    );
};
