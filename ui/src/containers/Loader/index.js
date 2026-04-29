import React from 'react';
import { useSelector } from 'react-redux';
import { Progress } from '@mantine/core';

import logo from '../../assets/imgs/logo_banner.png';

export default () => {
    const loading = useSelector((state) => state.loader.loading);
    const message = useSelector((state) => state.loader.message);

    if (!loading) return null;

    return (
        <div style={{
            height: 'fit-content',
            width: 800,
            position: 'absolute',
            top: 0,
            bottom: 0,
            left: 0,
            right: 0,
            margin: 'auto',
            background: '#0f0f0f',
            borderLeft: '4px solid #E5A502',
        }}>
            <div style={{ width: '100%', padding: 25, textAlign: 'center' }}>
                <img
                    src={logo}
                    style={{
                        maxWidth: 450,
                        width: '100%',
                        borderBottom: '2px solid rgba(255,255,255,0.12)',
                        marginBottom: 15,
                    }}
                />
                <div style={{ color: '#fff', fontSize: 28, textShadow: '0 0 5px #000', padding: 15 }}>
                    {message}
                </div>
            </div>
            <Progress
                value={100}
                animated
                color="brand"
                radius={0}
                size={4}
                style={{ background: '#0f0f0f' }}
            />
        </div>
    );
};
