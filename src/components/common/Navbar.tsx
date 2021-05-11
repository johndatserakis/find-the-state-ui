import {
  AppBar,
  Box,
  Button,
  Container,
  Toolbar,
  Tooltip,
  Typography,
  useMediaQuery,
  useTheme,
} from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import styled from 'styled-components/macro';
import { IconWithItem } from '../mui/IconWithItem';
import { Emoji } from './Emoji';
import { DEFAULT_CONTAINER_MAX_WIDTH } from '../../constants/style';
import { PlayMusicButton } from '../program/PlayMusicButton';
import { AboutModal } from '../program/AboutModal';
import { ScoreModalButton } from '../program/ScoreModalButton';

const BackgroundColorContainer = styled.div`
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
`;

const StyledAppBar = styled(AppBar)`
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const Navbar = () => {
  const theme = useTheme();
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <BackgroundColorContainer>
      <Container maxWidth={DEFAULT_CONTAINER_MAX_WIDTH}>
        <StyledAppBar position="static" elevation={0}>
          <Toolbar variant="dense">
            <IconWithItem
              iconLeft={<Emoji symbol="🔍" label="Search" />}
              item={<Typography variant="h6">{isDesktop ? <strong>Find the State</strong> : null}</Typography>}
            />
            <Box ml="auto">
              <AboutModal />
              <ScoreModalButton />
              <PlayMusicButton />
              <Tooltip title="View on GitHub" arrow>
                <Button
                  color="inherit"
                  href="https://github.com/johndatserakis/find-the-state-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHub />
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </StyledAppBar>
      </Container>
    </BackgroundColorContainer>
  );
};
