import { AppBar, Button, Container, Toolbar, Typography } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import styled from 'styled-components/macro';
import { IconWithItem } from '../mui/IconWithItem';
import { Emoji } from './Emoji';

const BackgroundColorContainer = styled.div`
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
`;

const StyledAppBar = styled(AppBar)`
  background: ${({ theme }) => theme.palette.background.default};
  color: ${({ theme }) => theme.palette.text.primary};
`;

const StyledButton = styled(Button)`
  margin-left: auto;
`;

export const Navbar = () => {
  return (
    <BackgroundColorContainer>
      <Container maxWidth="lg">
        <StyledAppBar position="static" elevation={0}>
          <Toolbar variant="dense">
            <IconWithItem
              iconLeft={<Emoji symbol="🔍" label="Search" />}
              item={<Typography variant="h6">Find The State</Typography>}
            />
            <StyledButton
              // color="secondary"
              color="inherit"
              href="https://github.com/johndatserakis/find-the-state"
              title="View on GitHub"
              // target="_blank"
              // rel="noopener noreferrer"
            >
              <GitHub />
            </StyledButton>
          </Toolbar>
        </StyledAppBar>
      </Container>
    </BackgroundColorContainer>
  );
};
