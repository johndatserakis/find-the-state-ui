import { AppBar, Button, Container, Toolbar, Typography } from '@material-ui/core';
import { GitHub } from '@material-ui/icons';
import styled from 'styled-components/macro';
import { colors } from '../style/colors';

const BackgroundColorContainer = styled.div`
  background: ${colors.blue[500]};
`;

const StyledButton = styled(Button)`
  margin-left: auto;
`;

export const Navbar = () => {
  return (
    <BackgroundColorContainer>
      <Container maxWidth="lg">
        <AppBar position="static" elevation={0}>
          <Toolbar variant="dense">
            <Typography variant="h6">🔍 &nbsp;Find The State</Typography>
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
        </AppBar>
      </Container>
    </BackgroundColorContainer>
  );
};
