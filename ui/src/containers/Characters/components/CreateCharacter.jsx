import React from 'react';
import { useDispatch } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { STATE_CREATE } from '../../../util/States';

export default () => {
    const dispatch = useDispatch();

    return (
        <div
            onClick={() => dispatch({ type: 'SET_STATE', payload: { state: STATE_CREATE } })}
            style={{
                height: 100,
                width: 60,
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                background: 'rgba(15,15,15,0.5)',
                borderLeft: '2px solid #52984a',
                cursor: 'pointer',
                flexShrink: 0,
                fontSize: 22,
                transition: 'border-color 0.15s ease-in',
            }}
            onMouseEnter={(e) => { e.currentTarget.style.borderColor = '#244a20'; }}
            onMouseLeave={(e) => { e.currentTarget.style.borderColor = '#52984a'; }}
        >
            <FontAwesomeIcon icon="plus-circle" color="#52984a" />
        </div>
    );
};
