import { AppBar, Box, Button, Container, Theme, Toolbar, Typography, useMediaQuery, useTheme } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import styled from 'styled-components/macro';
import { IconWithItem } from '../mui/IconWithItem';
import { Emoji } from './Emoji';
import { DEFAULT_CONTAINER_MAX_WIDTH } from '../../constants/style';
import { PlayMusicButton } from '../program/PlayMusicButton';
import { AboutModalButton } from '../program/AboutModalButton';

const BackgroundColorContainer = styled.div`
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
`;

const StyledAppBar = styled(AppBar)`
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
`;

export const Navbar = () => {
  const theme: Theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.up('sm'));

  return (
    <BackgroundColorContainer>
      <Container maxWidth={DEFAULT_CONTAINER_MAX_WIDTH}>
        <StyledAppBar position="static" elevation={0}>
          <Toolbar variant="dense">
            <IconWithItem
              iconLeft={<Emoji symbol="🔍" label="Search" />}
              item={
                <Typography variant="h6">{matches ? <strong>Find the State</strong> : <strong>FTS</strong>}</Typography>
              }
            />
            <Box ml="auto">
              <AboutModalButton />
              <PlayMusicButton />
              <Button
                color="inherit"
                href="https://github.com/johndatserakis/find-the-state-ui"
                title="View on GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <GitHub />
              </Button>
            </Box>
          </Toolbar>
        </StyledAppBar>
      </Container>
    </BackgroundColorContainer>
  );
};
