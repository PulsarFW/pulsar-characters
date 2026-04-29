import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Group } from '@mantine/core';
import { STATE_CHARACTERS, STATE_CREATE, STATE_SPAWN } from '../util/States';

const STATES = [
    { key: STATE_CHARACTERS, label: 'Characters' },
    { key: STATE_CREATE,     label: 'Create' },
    { key: STATE_SPAWN,      label: 'Spawn' },
];

export default () => {
    const dispatch = useDispatch();
    const appState = useSelector((s) => s.app.state);
    const characters = useSelector((s) => s.characters.characters);

    const go = (state) => {
        if (state === STATE_SPAWN) {
            dispatch({ type: 'SELECT_CHARACTER', payload: { character: characters[0] } });
        }
        dispatch({ type: 'SET_STATE', payload: { state } });
    };

    return (
        <div style={{
            position: 'fixed',
            top: 10,
            left: 10,
            zIndex: 9999,
            background: 'rgba(0,0,0,0.9)',
            border: '1px solid #E5A502',
            borderRadius: 4,
            padding: '6px 10px',
            display: 'flex',
            alignItems: 'center',
            gap: 8,
        }}>
            <span style={{ fontSize: 10, color: '#E5A502', fontWeight: 'bold', letterSpacing: 1 }}>
                DEV
            </span>
            <Group gap={4}>
                {STATES.map(({ key, label }) => (
                    <Button
                        key={key}
                        size="xs"
                        variant={appState === key ? 'filled' : 'outline'}
                        color="brand"
                        onClick={() => go(key)}
                        style={{ minWidth: 80 }}
                    >
                        {label}
                    </Button>
                ))}
            </Group>
        </div>
    );
};
