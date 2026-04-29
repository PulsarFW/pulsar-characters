import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import { SelectSpawn } from '../../../util/NuiEvents';
import Nui from '../../../util/Nui';

const GOLD = '#E5A502';
const BORDER_DIM = 'rgba(255,255,255,0.12)';

export default ({ spawn, onPlay }) => {
    const dispatch = useDispatch();
    const selected = useSelector((state) => state.spawn.selected);

    const isActive = selected?.id === spawn?.id;

    const onClick = () => {
        Nui.send(SelectSpawn, { spawn });
        dispatch({ type: 'SELECT_SPAWN', payload: spawn });
    };

    return (
        <div
            onClick={onClick}
            onDoubleClick={onPlay}
            style={{
                width: 300,
                height: 50,
                padding: 5,
                display: 'flex',
                alignItems: 'center',
                background: 'rgba(15,15,15,0.5)',
                borderLeft: `2px solid ${isActive ? GOLD : '#1c1c1c'}`,
                transition: 'border-color 0.15s ease-in',
                userSelect: 'none',
                cursor: 'pointer',
                marginBottom: 4,
            }}
            onMouseEnter={(e) => { if (!isActive) e.currentTarget.style.borderColor = '#FA5800'; }}
            onMouseLeave={(e) => { if (!isActive) e.currentTarget.style.borderColor = '#1c1c1c'; }}
        >
            <div style={{
                width: 48,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: 18,
                borderRight: `1px solid ${BORDER_DIM}`,
                flexShrink: 0,
                alignSelf: 'stretch',
            }}>
                <FontAwesomeIcon icon={spawn.icon || 'location-dot'} />
            </div>
            <div style={{ padding: '0 10px', fontSize: 18, lineHeight: '35px' }}>
                {spawn.label}
            </div>
        </div>
    );
};
