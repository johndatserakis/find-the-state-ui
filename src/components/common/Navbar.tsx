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

const Container = styled.div`
  margin: 0 auto;
  max-width: ${DEFAULT_CONTAINER_MAX_WIDTH}px;
  width: 100%;
`;

const BackgroundColorContainer = styled.div`
  background: ${theme.palette.background.default};
  color: ${theme.palette.text.primary};
`;

const StyledAppBar = styled(AppBar)`
  background: ${theme.palette.background.default};
  background-color: ${theme.palette.background.default};
  color: ${theme.palette.text.primary};
`;

export const Navbar = () => {
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <BackgroundColorContainer>
      <Container>
        <StyledAppBar position="static" elevation={0}>
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
        </StyledAppBar>
      </Container>
    </BackgroundColorContainer>
  );
};
