import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { TextInput, Textarea, Select, Button, Group, Stack } from '@mantine/core';
import { DatePickerInput } from '@mantine/dates';
import { getCodeList } from 'country-list';
import dayjs from 'dayjs';

import Nui from '../../util/Nui';
import { STATE_CHARACTERS } from '../../util/States';
import { CreateCharacter } from '../../util/NuiEvents';

const countryCodes = getCodeList();
const countryOptions = Object.entries(countryCodes).map(([code, name]) => ({
    value: code,
    label: name,
}));

const genderOptions = [
    { value: '0', label: 'Male' },
    { value: '1', label: 'Female' },
];

const INPUT_STYLES = {
    input: {
        background: '#1a1a1a',
        border: '1px solid rgba(255,255,255,0.23)',
        color: '#fff',
        borderRadius: 4,
    },
    label: { color: '#ccc', marginBottom: 4 },
};

export default () => {
    const dispatch = useDispatch();

    const [state, setState] = useState({
        first: '',
        last: '',
        dob: dayjs().subtract(18, 'year').toDate(),
        gender: '0',
        bio: '',
        origin: null,
    });

    const set = (key) => (val) => setState((s) => ({ ...s, [key]: val }));
    const onChange = (key) => (e) => set(key)(e.target.value);

    const onSubmit = (e) => {
        e.preventDefault();
        Nui.send(CreateCharacter, {
            first: state.first,
            last: state.last,
            gender: state.gender,
            dob: dayjs(state.dob).format('YYYY-MM-DD'),
            origin: state.origin,
            bio: state.bio,
            lastPlayed: -1,
        });
        dispatch({ type: 'LOADING_SHOW', payload: { message: 'Creating Character' } });
    };

    return (
        <div style={{
            width: 650,
            height: 'fit-content',
            maxHeight: '90vh',
            overflowY: 'auto',
            position: 'absolute',
            top: 0,
            bottom: 0,
            right: 0,
            left: 0,
            margin: 'auto',
            background: '#0f0f0f',
            borderLeft: '4px solid #E5A502',
        }}>
            <div style={{ margin: 25 }}>
                <div style={{
                    textAlign: 'center',
                    borderBottom: '2px solid rgba(255,255,255,0.12)',
                    fontSize: 26,
                    paddingBottom: 15,
                    marginBottom: 20,
                }}>
                    Create Character
                </div>

                <form id="createForm" onSubmit={onSubmit} autoComplete="off">
                    <Stack gap="md">
                        <Group grow>
                            <TextInput
                                required
                                label="First Name"
                                value={state.first}
                                onChange={(e) => set('first')(e.target.value.replace(/\s/g, ''))}
                                styles={INPUT_STYLES}
                            />
                            <TextInput
                                required
                                label="Last Name"
                                value={state.last}
                                onChange={(e) => set('last')(e.target.value.replace(/\s/g, ''))}
                                styles={INPUT_STYLES}
                            />
                        </Group>

                        <Select
                            label="Country of Origin"
                            data={countryOptions}
                            value={state.origin}
                            onChange={set('origin')}
                            searchable
                            clearable
                            placeholder="Select country..."
                            styles={INPUT_STYLES}
                        />

                        <Group grow>
                            <Select
                                required
                                label="Gender"
                                data={genderOptions}
                                value={state.gender}
                                onChange={set('gender')}
                                allowDeselect={false}
                                styles={INPUT_STYLES}
                            />
                            <DatePickerInput
                                required
                                label="Date of Birth"
                                value={state.dob}
                                onChange={set('dob')}
                                maxDate={dayjs().subtract(18, 'year').toDate()}
                                minDate={dayjs().subtract(100, 'year').toDate()}
                                valueFormat="MM/DD/YYYY"
                                styles={INPUT_STYLES}
                            />
                        </Group>

                        <Textarea
                            required
                            label="Character Biography"
                            value={state.bio}
                            onChange={onChange('bio')}
                            rows={4}
                            styles={INPUT_STYLES}
                        />
                    </Stack>
                </form>
            </div>

            <Group justify="center" pb="lg" gap="md">
                <Button
                    variant="filled"
                    color="red"
                    size="md"
                    style={{ width: 120, borderRadius: 3 }}
                    onClick={() => dispatch({ type: 'SET_STATE', payload: { state: STATE_CHARACTERS } })}
                >
                    Cancel
                </Button>
                <Button
                    type="submit"
                    form="createForm"
                    variant="filled"
                    color="green"
                    size="md"
                    style={{ width: 120, borderRadius: 3 }}
                >
                    Create
                </Button>
            </Group>
        </div>
    );
};
