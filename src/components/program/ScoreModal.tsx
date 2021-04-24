import { useEffect, useState } from 'react';
import { get as getScores } from '../../api/score';
import { Scores } from '../../types/score';
import { DataGrid, GridColDef } from '@material-ui/data-grid';
import styled from 'styled-components/macro';
import { pxToRem } from '../../utils/style';
import { formatStopwatchFromDatabase } from '../../utils/stopwatch';
import { DEFAULT_PROGRAM_BREAKPOINT } from '../../constants/style';
import { sortBy as _sortBy } from 'lodash';

const DataGridContainer = styled.div`
  height: ${pxToRem(400)};
  max-width: 100%;
  min-width: ${pxToRem(250)};
  width: 100%;

  @media (min-width: ${DEFAULT_PROGRAM_BREAKPOINT}px) {
    min-width: ${pxToRem(400)};
  }
`;

export const ScoreModal = () => {
  const [scores, setScores] = useState<Scores>([]);
  const [loading, setLoading] = useState(false);

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
      field: 'created_date',
      headerName: 'Date Submitted',
      flex: 1,
      renderCell: ({ value }) => {
        const date = new Intl.DateTimeFormat('en-US').format(new Date(value as string));

        return <span>{date}</span>;
      },
    },
  ];

  useEffect(() => {
    // https://github.com/facebook/react/issues/14326#issuecomment-441680293
    async function fetch() {
      setLoading(true);

      try {
        // TODO: Create a TypeGuard for all my API calls as there's a `Value | Error` issue with my usage.
        const s = await getScores();
        const castedScores = s as Scores;
        const sortedScores = _sortBy(castedScores, 'score');
        setScores(sortedScores);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    }

    fetch();
  }, []);

  return (
    <DataGridContainer>
      <DataGrid rows={scores} columns={columns} loading={loading} columnBuffer={0} />
    </DataGridContainer>
  );
};
