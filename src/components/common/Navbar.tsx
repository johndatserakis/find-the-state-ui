import { GitHub } from '@mui/icons-material';
import { AppBar, Box, Button, Container, Toolbar, Tooltip, Typography, useMediaQuery, useTheme } from '@mui/material';
import styled from 'styled-components';
import { DEFAULT_CONTAINER_MAX_WIDTH } from '../../constants/style';
import { theme } from '../../styles/theme';
import { IconWithItem } from '../mui/IconWithItem';
import { AboutModal } from '../program/AboutModal';
import { PlayMusicButton } from '../program/PlayMusicButton';
import { ScoreModalButton } from '../program/ScoreModalButton';
import { Emoji } from './Emoji';

const BackgroundColorContainer = styled.div`
  background: ${theme.palette.background.default};
  color: ${theme.palette.text.primary};
`;

const StyledAppBar = styled(AppBar)`
  background: ${theme.palette.background.default};
  color: ${theme.palette.text.primary};
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
