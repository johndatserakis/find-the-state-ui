import { GitHub } from '@mui/icons-material';
import { AppBar, Box, Button, Toolbar, Tooltip, Typography, useMediaQuery } from '@mui/material';
import styled from 'styled-components';
import { DEFAULT_CONTAINER_MAX_WIDTH } from '../../constants/style';
import { AboutModal } from '../../program/components/AboutModal';
import { PlayMusicButton } from '../../program/components/PlayMusicButton';
import { ScoreModalButton } from '../../program/components/ScoreModalButton';
import { theme } from '../../styles/theme';
import { IconWithItem } from '../mui/IconWithItem';
import { Emoji } from './Emoji';

const BackgroundColorContainer = styled.div`
  background: ${theme.palette.background.default};
  color: ${theme.palette.text.primary};
`;

const Container = styled.div`
  margin: 0 auto;
  max-width: ${DEFAULT_CONTAINER_MAX_WIDTH}px;
  width: 100%;
`;

export const Navbar = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <BackgroundColorContainer>
      <Container>
        <AppBar
          elevation={0}
          position="static"
          sx={{ backgroundColor: theme.palette.background.default, color: theme.palette.text.primary }}
        >
          <Toolbar variant="dense">
            <IconWithItem
              iconLeft={<Emoji symbol="🔍" label="Search" />}
              item={
                isDesktop ? (
                  <Typography component="h1" variant="h6">
                    <strong>Find the State</strong>
                  </Typography>
                ) : null
              }
            />
            <Box ml="auto">
              <AboutModal />
              <ScoreModalButton />
              <PlayMusicButton />
              <Tooltip title="View on GitHub" arrow>
                <Button
                  color="black"
                  href="https://github.com/johndatserakis/find-the-state-ui"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <GitHub />
                </Button>
              </Tooltip>
            </Box>
          </Toolbar>
        </AppBar>
      </Container>
    </BackgroundColorContainer>
  );
};
