import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Group, Text } from '@mantine/core';

import Nui from '../../../util/Nui';
import { SelectCharacter, DeleteCharacter } from '../../../util/NuiEvents';

const GOLD = '#E5A502';
const BORDER_DIM = 'rgba(255,255,255,0.12)';
const CARD_BG = 'rgba(15,15,15,0.5)';

export default ({ character }) => {
    const dispatch = useDispatch();
    const selected = useSelector((state) => state.characters.selected);
    const [open, setOpen] = useState(false);

    const isActive = selected?.ID === character?.ID;

    const onClick = () => {
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
                ? `${j.Workplace.Name} - ${j.Grade.Name}`
                : `${j.Name} - ${j.Grade.Name}`;
        }
        return `${character.Jobs.length} Jobs`;
    };

    const lastPlayed = () => {
        if (+character.LastPlayed === -1) return 'Never';
        return new Date(+character.LastPlayed).toLocaleDateString('en-US', {
            month: 'numeric', day: 'numeric', year: 'numeric',
            hour: 'numeric', minute: '2-digit', second: '2-digit',
        });
    };

    return (
        <>
            <div
                onDoubleClick={onClick}
                onContextMenu={(e) => { e.preventDefault(); setOpen(true); }}
                style={{
                    width: 300,
                    height: 100,
                    padding: 5,
                    display: 'inline-flex',
                    background: CARD_BG,
                    borderLeft: `2px solid ${isActive ? GOLD : '#1c1c1c'}`,
                    transition: 'border-color 0.15s ease-in',
                    userSelect: 'none',
                    cursor: 'pointer',
                    flexShrink: 0,
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
                }}>
                    {character.SID}
                </div>
                <div style={{ padding: 5, overflow: 'hidden' }}>
                    <div style={{ fontSize: 18, lineHeight: '24px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {character.First} {character.Last}
                    </div>
                    <div style={{ fontSize: 14, lineHeight: '24px', color: '#aaa', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                        {jobLabel()}
                    </div>
                    <div style={{ fontSize: 13, lineHeight: '24px', color: '#888' }}>
                        Last: {lastPlayed()}
                    </div>
                </div>
            </div>

            <Modal
                opened={open}
                onClose={() => setOpen(false)}
                title={`Delete ${character.First} ${character.Last}?`}
                centered
                size="sm"
            >
                <Text size="sm" c="dimmed">
                    Are you sure you want to delete {character.First} {character.Last}?
                    This action is completely & entirely irreversible by <i><b>anyone</b></i> including staff.
                </Text>
                <Group justify="flex-end" mt="md">
                    <Button variant="subtle" color="gray" onClick={() => setOpen(false)}>No</Button>
                    <Button color="red" onClick={onDelete}>Yes, Delete</Button>
                </Group>
            </Modal>
        </>
    );
};
