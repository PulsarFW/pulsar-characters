import React from 'react';
import { useSelector } from 'react-redux';

import { Motd } from '../../components';
import { TEXT_DIM, TEXT_SECONDARY, TEXT_FAINT } from '../../theme';
import CharacterButton from './components/CharacterButton';
import CreateCharacter from './components/CreateCharacter';

export default () => {
    const characters = useSelector((state) => state.characters.characters);
    const characterLimit = useSelector((state) => state.characters.characterLimit);
    const motd = useSelector((state) => state.characters.motd);

    return (
        <div style={{
            height: '100vh',
            width: '100vw',
            position: 'relative',
            display: 'flex',
            alignItems: 'flex-end',
            justifyContent: 'flex-start',
        }}>
            {Boolean(motd) && <Motd message={motd} />}

            {/* Card row — bottom-left, offset so ped has room on the right */}
            <div style={{
                display: 'flex',
                alignItems: 'flex-end',
                gap: 10,
                paddingLeft: 60,
                paddingBottom: 72,
            }}>
                {characters.map((char, i) => (
                    <CharacterButton key={char.ID} character={char} index={i} />
                ))}
                {characters.length < characterLimit && (
                    <CreateCharacter index={characters.length} />
                )}
            </div>

            {/* Help footer */}
            <div style={{
                position: 'absolute',
                bottom: 22,
                display: 'flex',
                gap: 18,
                fontSize: 10,
                color: TEXT_DIM,
                letterSpacing: '0.8px',
                pointerEvents: 'none',
                left: '50%',
                transform: 'translateX(-50%)',
            }}>
                <span><span style={{ color: TEXT_SECONDARY }}>DOUBLE CLICK</span> to play</span>
                <span style={{ color: TEXT_FAINT }}>·</span>
                <span><span style={{ color: TEXT_SECONDARY }}>RIGHT CLICK</span> to delete</span>
            </div>
        </div>
    );
};
