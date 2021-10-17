import { Typography } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { sortBy as _sortBy } from 'lodash';
import styled from 'styled-components';
import { DEFAULT_PROGRAM_BREAKPOINT } from '../../constants/style';
import { formatStopwatchFromDatabase } from '../../utils/stopwatch';
import { pxToRem } from '../../utils/style';
import { useGetScores } from '../api/score';

const NoRowsOverlayContainer = styled.div`
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
`;

const NoRowsOverlay = () => (
  <NoRowsOverlayContainer>
    <Typography variant="body1" gutterBottom>
      No scores found
    </Typography>
  </NoRowsOverlayContainer>
);

const DataGridContainer = styled.div`
  height: ${pxToRem(400)};
  max-width: 100%;
  min-width: ${pxToRem(250)};
  width: 100%;

  @media (min-width: ${DEFAULT_PROGRAM_BREAKPOINT}px) {
    min-width: ${pxToRem(500)};
  }
`;

export const ScoreModal = () => {
  const { data, loading } = useGetScores();
  const scores = data !== undefined ? _sortBy(data, 'created_date').reverse() : [];

  const columns: GridColDef[] = [
    {
      field: 'score',
      headerName: 'Time',
      flex: 1,
      renderCell: ({ value }) => {
        const score = formatStopwatchFromDatabase(value as string);

        return <span>{score}</span>;
      },
    },
    {
      field: 'streak_high',
      headerName: 'High Streak',
      flex: 1,
    },
    {
      field: 'created_date',
      headerName: 'Date Submitted',
      flex: 1,
      renderCell: ({ value }) => {
        const date = new Intl.DateTimeFormat('en-US').format(new Date(value as string));

        return <span>{date}</span>;
      },
    },
  ];

  return (
    <DataGridContainer>
      <DataGrid components={{ NoRowsOverlay }} rows={scores} columns={columns} loading={loading} columnBuffer={0} />
    </DataGridContainer>
  );
};
