import React from 'react';
import { useSelector } from 'react-redux';

import { Motd } from '../../components';
import logo from '../../assets/imgs/logo_banner.png';
import CharacterButton from './components/CharacterButton';
import Help from './components/Help';
import CreateCharacter from './components/CreateCharacter';

export default () => {
    const characters = useSelector((state) => state.characters.characters);
    const characterLimit = useSelector((state) => state.characters.characterLimit);
    const motd = useSelector((state) => state.characters.motd);

    return (
        <div style={{ height: '100vh', width: '100vw', position: 'relative' }}>
            {Boolean(motd) && <Motd message={motd} />}
            <Help />
            <img src={logo} style={{ width: 300, position: 'absolute', right: 0, top: 0 }} />
            <div style={{
                position: 'absolute',
                bottom: 100,
                left: 0,
                right: 0,
                margin: 'auto',
                width: 'fit-content',
                height: 101,
                display: 'flex',
                gap: 4,
                overflowX: 'auto',
                maxWidth: '95.3vw',
            }}>
                {characters.length < characterLimit && <CreateCharacter />}
                {characters.map((char, i) => (
                    <CharacterButton key={i} id={i} character={char} />
                ))}
            </div>
        </div>
    );
};
