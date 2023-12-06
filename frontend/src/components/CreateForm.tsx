import React, { useState } from 'react';

import { TextField, Button, Container, Grid, Typography } from '@mui/material';

import { CreateFormProps } from '../lib/definitions';

const CreateForm: React.FC<CreateFormProps> = ({ addReservation }) => {
  const [title, setTitle] = useState<string>('');
  const [startAt, setStartAt] = useState<string>('');
  const [endAt, setEndAt] = useState<string>('');

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const newReservation = {
      title,
      start_at: startAt,
      end_at: endAt,
    };

    addReservation(newReservation);

    setTitle('');
    setStartAt('');
    setEndAt('');
  };

  return (
    <Container sx={{ my: '15px' }}>
      <Typography variant='overline'>Create Reservation</Typography>
      <form onSubmit={handleSubmit}>
        <TextField
          inputProps={{ 'data-testid': 'title-input' }}
          label='Title'
          variant='outlined'
          fullWidth
          margin='normal'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />

        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField
              inputProps={{ 'data-testid': 'start_at-input' }}
              helperText='Please enter start date and time'
              type='datetime-local'
              variant='outlined'
              fullWidth
              margin='normal'
              value={startAt}
              onChange={(e) => setStartAt(e.target.value)}
              required
            />
          </Grid>
          <Grid item xs={6}>
            <TextField
              inputProps={{ 'data-testid': 'end_at-input' }}
              helperText='Please enter end date and time'
              type='datetime-local'
              variant='outlined'
              fullWidth
              margin='normal'
              value={endAt}
              onChange={(e) => setEndAt(e.target.value)}
              required
            />
          </Grid>
        </Grid>

        <Button
          type='submit'
          variant='contained'
          color='primary'
          sx={{ marginTop: '10px' }}
          fullWidth
        >
          Add Reservation
        </Button>
      </form>
    </Container>
  );
};

export default CreateForm;
