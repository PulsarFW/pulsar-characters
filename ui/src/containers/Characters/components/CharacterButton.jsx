import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Group, Text } from '@mantine/core';

import Nui from '../../../util/Nui';
import { SelectCharacter, DeleteCharacter } from '../../../util/NuiEvents';
import { ACCENT, BG_CARD, BG_ACTIVE, TEXT_PRIMARY, TEXT_SECONDARY, TEXT_DIM, TEXT_FAINT, BORDER_SUBTLE, BORDER_DIM, CARD_WIDTH, CARD_HEIGHT } from '../../../theme';

const relativeTime = (ts) => {
    if (+ts === -1) return 'Never';
    const diff = Date.now() - +ts;
    const mins = Math.floor(diff / 60000);
    if (mins < 1) return 'Just now';
    if (mins < 60) return `${mins}m ago`;
    const hours = Math.floor(mins / 60);
    if (hours < 24) return `${hours}h ago`;
    return `${Math.floor(hours / 24)}d ago`;
};

export default ({ character, index }) => {
    const dispatch = useDispatch();
    const selected = useSelector((state) => state.characters.selected);
    const [open, setOpen] = useState(false);
    const [hovered, setHovered] = useState(false);

    const isActive = selected?.ID === character?.ID;

    const onSelect = () => dispatch({ type: 'SELECT_CHARACTER', payload: { character } });

    const onPlay = () => {
        dispatch({ type: 'LOADING_SHOW', payload: { message: 'Getting Spawn Points' } });
        dispatch({ type: 'SELECT_CHARACTER', payload: { character } });
        Nui.send(SelectCharacter, { id: character.ID });
    };

    const onDelete = () => {
        dispatch({ type: 'LOADING_SHOW', payload: { message: 'Deleting Character' } });
        Nui.send(DeleteCharacter, { id: character.ID });
    };

    const jobLabel = () => {
        if (!character?.Jobs || character.Jobs.length === 0) return 'Unemployed';
        if (character.Jobs.length === 1) {
            const j = character.Jobs[0];
            return j.Workplace
                ? `${j.Workplace.Name} · ${j.Grade.Name}`
                : `${j.Name} · ${j.Grade.Name}`;
        }
        return `${character.Jobs.length} Active Jobs`;
    };

    const lift = isActive ? -14 : hovered ? -7 : 0;

    return (
        <>
            <div
                onClick={onSelect}
                onDoubleClick={onPlay}
                onContextMenu={(e) => { e.preventDefault(); setOpen(true); }}
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                style={{
                    width: CARD_WIDTH,
                    height: CARD_HEIGHT,
                    flexShrink: 0,
                    position: 'relative',
                    background: isActive ? BG_ACTIVE : BG_CARD,
                    borderTop: `2px solid ${isActive ? ACCENT : hovered ? BORDER_DIM : BORDER_SUBTLE}`,
                    borderLeft: `1px solid ${BORDER_SUBTLE}`,
                    borderRight: `1px solid ${BORDER_SUBTLE}`,
                    borderBottom: `1px solid ${BORDER_SUBTLE}`,
                    boxShadow: '0 12px 40px rgba(0,0,0,0.6)',
                    transform: `translateY(${lift}px)`,
                    transition: 'transform 0.28s cubic-bezier(0.34,1.3,0.64,1), border-color 0.2s ease, background 0.2s ease',
                    cursor: 'pointer',
                    userSelect: 'none',
                    display: 'flex',
                    flexDirection: 'column',
                    padding: '20px 18px 18px',
                    overflow: 'hidden',
                    animation: 'fadeInUp 0.5s ease',
                    animationFillMode: 'both',
                    animationDelay: `${index * 0.09}s`,
                }}
            >
                {/* Watermark index */}
                <div style={{
                    position: 'absolute',
                    bottom: -18,
                    right: -6,
                    fontSize: 130,
                    fontWeight: 900,
                    lineHeight: 1,
                    letterSpacing: '-6px',
                    color: 'rgba(255,255,255,0.02)',
                    userSelect: 'none',
                    pointerEvents: 'none',
                }}>
                    {String(index + 1).padStart(2, '0')}
                </div>

                {/* Slot label */}
                <div style={{
                    fontSize: 9,
                    fontWeight: 700,
                    letterSpacing: '3px',
                    color: isActive ? ACCENT : TEXT_DIM,
                    textTransform: 'uppercase',
                    transition: 'color 0.2s ease',
                    marginBottom: 'auto',
                }}>
                    Slot {String(index + 1).padStart(2, '0')}
                </div>

                <div style={{ flex: 1 }} />

                {/* Name */}
                <div style={{
                    fontSize: 22,
                    fontWeight: 700,
                    lineHeight: 1.2,
                    color: isActive || hovered ? TEXT_PRIMARY : TEXT_SECONDARY,
                    letterSpacing: '-0.3px',
                    marginBottom: 10,
                    transition: 'color 0.2s ease',
                }}>
                    {character.First}<br />{character.Last}
                </div>

                {/* Job */}
                <div style={{
                    fontSize: 11,
                    color: isActive ? TEXT_SECONDARY : TEXT_DIM,
                    letterSpacing: '0.2px',
                    lineHeight: 1.5,
                    marginBottom: 3,
                    transition: 'color 0.2s ease',
                    whiteSpace: 'nowrap',
                    overflow: 'hidden',
                    textOverflow: 'ellipsis',
                }}>
                    {jobLabel()}
                </div>

                {/* SID */}
                <div style={{
                    fontSize: 10,
                    color: TEXT_FAINT,
                    letterSpacing: '1px',
                    marginBottom: 14,
                }}>
                    #{character.SID}
                </div>

                {/* Separator */}
                <div style={{
                    height: 1,
                    marginBottom: 10,
                    background: isActive
                        ? `linear-gradient(90deg, ${ACCENT}, transparent)`
                        : 'rgba(255,255,255,0.03)',
                    transition: 'background 0.2s ease',
                }} />

                {/* Last played */}
                <div style={{
                    fontSize: 14,
                    fontWeight: 600,
                    color: isActive ? ACCENT : TEXT_DIM,
                    letterSpacing: '0.2px',
                    transition: 'color 0.2s ease',
                    marginBottom: 2,
                }}>
                    {relativeTime(character.LastPlayed)}
                </div>
                <div style={{
                    fontSize: 8,
                    color: TEXT_FAINT,
                    letterSpacing: '1.5px',
                    textTransform: 'uppercase',
                }}>
                    Last Played
                </div>
            </div>

            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                title={`Delete ${character.First} ${character.Last}?`}
                centered
                size="sm"
            >
                <Text size="sm" c="dimmed" mb="md">
                    This is permanently irreversible — this character will be gone forever, including by staff.
                </Text>
                <Group justify="flex-end" gap="xs">
                    <Button variant="subtle" color="gray" onClick={() => setOpen(false)}>Cancel</Button>
                    <Button color="red" onClick={onDelete}>Delete Forever</Button>
                </Group>
            </Modal>
        </>
    );
};
