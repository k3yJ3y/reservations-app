import React from 'react';

import {
  Table,
  TableContainer,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Typography,
  Container,
  Box,
} from '@mui/material';

import RemoveCircleTwoToneIcon from '@mui/icons-material/RemoveCircleTwoTone';

import { formatDate } from '../util/formatDate';

const Placeholder = () => (
  <Box
    border={1}
    borderRadius={4}
    borderColor='grey.300'
    p={5}
    textAlign='center'
  >
    <Typography variant='body1' color='textSecondary'>
      There are no active reservations at the moment ...
    </Typography>
  </Box>
);

const isReservationActive = (startAt, endAt) => {
  const currentDate = new Date();
  const startDate = new Date(startAt);
  const endDate = new Date(endAt);

  return startDate <= currentDate && currentDate <= endDate;
};

const ReservationTable = ({ reservations, onDelete }) => {
  return (
    <Container>
      <Typography variant='overline'>Active Reservations</Typography>
      {reservations.length === 0 ? (
        <Placeholder />
      ) : (
        <TableContainer component={Paper}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell sx={{ fontWeight: 'bold' }}>Title</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>Start At</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}>End At</TableCell>
                <TableCell sx={{ fontWeight: 'bold' }}></TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {reservations.map((reservation) => (
                <TableRow
                  key={reservation.reservationId}
                  sx={{
                    backgroundColor: isReservationActive(
                      reservation.start_at,
                      reservation.end_at
                    )
                      ? '#a4f5b1'
                      : new Date(reservation.end_at) < new Date()
                      ? '#ffc4c4'
                      : 'inherit',
                    color: 'white',
                  }}
                >
                  <TableCell>{reservation.title}</TableCell>
                  <TableCell>{formatDate(reservation.start_at)}</TableCell>
                  <TableCell>{formatDate(reservation.end_at)}</TableCell>
                  <TableCell>
                    <IconButton
                      variant='outlined'
                      color='error'
                      onClick={() => onDelete(reservation.reservationId)}
                      data-testid={`delete-button-${reservation.reservationId}`}
                    >
                      <RemoveCircleTwoToneIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}
    </Container>
  );
};

export default ReservationTable;
