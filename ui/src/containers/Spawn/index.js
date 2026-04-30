import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import Nui from '../../util/Nui';
import { Motd } from '../../components';
import SpawnButton from './components/SpawnButton';
import { STATE_CHARACTERS } from '../../util/States';
import { PlayCharacter } from '../../util/NuiEvents';
import { ACCENT, ACCENT_HOVER, BG_BASE, TEXT_PRIMARY, TEXT_FAINT, BORDER_SUBTLE, SPAWN_PANEL_WIDTH } from '../../theme';

export default () => {
    const dispatch = useDispatch();

    const motd     = useSelector((state) => state.characters.motd);
    const spawns   = useSelector((state) => state.spawn.spawns);
    const selected = useSelector((state) => state.spawn.selected);
    const char     = useSelector((state) => state.characters.selected);

    const onSpawn = () => {
        if (!selected) return;
        Nui.send(PlayCharacter, { spawn: selected, character: char });
        dispatch({ type: 'LOADING_SHOW', payload: { message: 'Spawning' } });
        dispatch({ type: 'UPDATE_PLAYED' });
        dispatch({ type: 'DESELECT_CHARACTER' });
        dispatch({ type: 'DESELECT_SPAWN' });
    };

    const goBack = () => {
        dispatch({ type: 'DESELECT_CHARACTER' });
        dispatch({ type: 'DESELECT_SPAWN' });
        dispatch({ type: 'SET_STATE', payload: { state: STATE_CHARACTERS } });
    };

    return (
        <div style={{ height: '100vh', width: '100vw', display: 'flex', position: 'relative' }}>
            {Boolean(motd) && <Motd message={motd} />}

            {/* Left spawn panel */}
            <div style={{
                width: SPAWN_PANEL_WIDTH,
                height: '100%',
                background: BG_BASE,
                borderRight: `1px solid ${BORDER_SUBTLE}`,
                display: 'flex',
                flexDirection: 'column',
                animation: 'slideInLeft 0.4s ease',
                animationFillMode: 'both',
                flexShrink: 0,
            }}>
                {/* Header */}
                <div style={{
                    padding: '22px 20px 18px',
                    borderBottom: `1px solid ${BORDER_SUBTLE}`,
                    flexShrink: 0,
                }}>
                    <div style={{
                        fontSize: 9,
                        letterSpacing: '3.5px',
                        color: ACCENT,
                        fontWeight: 700,
                        textTransform: 'uppercase',
                        marginBottom: 6,
                    }}>
                        Choose Location
                    </div>
                    <div style={{ height: 1, background: BORDER_SUBTLE }} />
                </div>

                {/* Spawn list */}
                <div style={{ flex: 1, overflowY: 'auto' }}>
                    {spawns.map((spawn, i) => (
                        <SpawnButton key={spawn.id ?? i} spawn={spawn} onPlay={onSpawn} index={i} />
                    ))}
                </div>

                {/* Back */}
                <div style={{
                    padding: '14px 20px',
                    borderTop: `1px solid ${BORDER_SUBTLE}`,
                    flexShrink: 0,
                }}>
                    <button
                        onClick={goBack}
                        style={{
                            background: 'none',
                            border: 'none',
                            color: TEXT_FAINT,
                            cursor: 'pointer',
                            fontSize: 10,
                            letterSpacing: '2px',
                            textTransform: 'uppercase',
                            fontWeight: 700,
                            fontFamily: 'Source Sans Pro, sans-serif',
                            display: 'flex',
                            alignItems: 'center',
                            gap: 10,
                            padding: 0,
                            transition: 'color 0.15s ease',
                        }}
                        onMouseEnter={(e) => { e.currentTarget.style.color = ACCENT; }}
                        onMouseLeave={(e) => { e.currentTarget.style.color = TEXT_FAINT; }}
                    >
                        <FontAwesomeIcon icon="arrow-left" />
                        Back to Characters
                    </button>
                </div>
            </div>

            {/* Bottom confirmation bar */}
            <div style={{
                position: 'absolute',
                bottom: 0,
                left: SPAWN_PANEL_WIDTH,
                right: 0,
                background: BG_BASE,
                borderTop: `1px solid ${selected ? ACCENT : BORDER_SUBTLE}`,
                padding: '18px 36px',
                display: 'flex',
                alignItems: 'center',
                gap: 32,
                transition: 'border-color 0.3s ease',
                animation: 'fadeInUp 0.4s ease',
                animationFillMode: 'both',
                animationDelay: '0.1s',
            }}>
                {/* Spawning as */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontSize: 9,
                        letterSpacing: '2.5px',
                        color: TEXT_FAINT,
                        textTransform: 'uppercase',
                        marginBottom: 4,
                    }}>
                        Spawning As
                    </div>
                    <div style={{
                        fontSize: 18,
                        fontWeight: 700,
                        color: TEXT_PRIMARY,
                        letterSpacing: '-0.2px',
                    }}>
                        {char?.First} {char?.Last}
                    </div>
                </div>

                <div style={{ width: 1, height: 32, background: BORDER_SUBTLE, flexShrink: 0 }} />

                {/* Location */}
                <div style={{ flex: 1 }}>
                    <div style={{
                        fontSize: 9,
                        letterSpacing: '2.5px',
                        color: TEXT_FAINT,
                        textTransform: 'uppercase',
                        marginBottom: 4,
                    }}>
                        Location
                    </div>
                    <div style={{
                        fontSize: 15,
                        fontWeight: 600,
                        color: selected ? ACCENT : TEXT_FAINT,
                        transition: 'color 0.2s ease',
                    }}>
                        {selected ? selected.label : '— Select a spawn point —'}
                    </div>
                </div>

                {/* Play button */}
                <button
                    onClick={onSpawn}
                    disabled={!selected}
                    style={{
                        height: 40,
                        paddingLeft: 32,
                        paddingRight: 32,
                        background: selected ? ACCENT : BORDER_SUBTLE,
                        border: `1px solid ${selected ? ACCENT : BORDER_SUBTLE}`,
                        color: selected ? '#fff' : TEXT_FAINT,
                        fontSize: 10,
                        letterSpacing: '3px',
                        textTransform: 'uppercase',
                        fontWeight: 700,
                        fontFamily: 'Source Sans Pro, sans-serif',
                        cursor: selected ? 'pointer' : 'default',
                        transition: 'all 0.2s ease',
                        flexShrink: 0,
                        borderRadius: 2,
                    }}
                    onMouseEnter={(e) => {
                        if (!selected) return;
                        e.currentTarget.style.background = ACCENT_HOVER;
                    }}
                    onMouseLeave={(e) => {
                        if (!selected) return;
                        e.currentTarget.style.background = ACCENT;
                    }}
                >
                    Play
                </button>
            </div>
        </div>
    );
};
