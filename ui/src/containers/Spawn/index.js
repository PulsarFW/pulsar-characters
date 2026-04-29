import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button, Group } from '@mantine/core';

import Nui from '../../util/Nui';
import { Motd } from '../../components';
import logo from '../../assets/imgs/logo_banner.png';
import SpawnButton from './components/SpawnButton';
import { STATE_CHARACTERS } from '../../util/States';
import { PlayCharacter } from '../../util/NuiEvents';

export default () => {
    const dispatch = useDispatch();

    const motd = useSelector((state) => state.characters.motd);
    const spawns = useSelector((state) => state.spawn.spawns);
    const selected = useSelector((state) => state.spawn.selected);
    const selectedChar = useSelector((state) => state.characters.selected);

    const onSpawn = () => {
        Nui.send(PlayCharacter, { spawn: selected, character: selectedChar });
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
        <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
            {Boolean(motd) && <Motd message={motd} />}
            <img src={logo} style={{ width: 300, position: 'absolute', right: 0, top: 0 }} />

            <div style={{
                position: 'absolute',
                top: 0,
                bottom: 0,
                left: 0,
                margin: 'auto',
                width: 'fit-content',
                maxWidth: 310,
                maxHeight: 600,
                height: '100%',
                overflowY: 'auto',
                padding: '8px 0',
            }}>
                {spawns.map((spawn, i) => (
                    <SpawnButton key={i} spawn={spawn} onPlay={onSpawn} />
                ))}
            </div>

            <div style={{
                height: 'fit-content',
                width: 300,
                position: 'absolute',
                right: 0,
                left: 0,
                bottom: 40,
                margin: 'auto',
                borderLeft: '4px solid #E5A502',
            }}>
                <div style={{ background: 'rgba(15,15,15,0.8)', padding: 10 }}>
                    <div style={{ fontSize: 18, color: '#aaa' }}>Spawning As</div>
                    <div style={{ fontSize: 22, color: '#E5A502', fontWeight: 'bold' }}>
                        {selectedChar?.First} {selectedChar?.Last}
                    </div>
                    <div style={{ fontSize: 18, color: '#aaa', marginTop: 4 }}>At</div>
                    <div style={{ fontSize: 22, color: '#E5A502', fontWeight: 'bold' }}>
                        {selected ? selected.label : '(No Spawn Selected)'}
                    </div>
                </div>
                <Group grow gap={0}>
                    <Button
                        radius={0}
                        color="red"
                        onClick={goBack}
                        style={{ borderRadius: 0 }}
                    >
                        Cancel
                    </Button>
                    {Boolean(selected) && (
                        <Button
                            radius={0}
                            color="green"
                            onClick={onSpawn}
                            style={{ borderRadius: 0 }}
                        >
                            Play
                        </Button>
                    )}
                </Group>
            </div>
        </div>
    );
};
