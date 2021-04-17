import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/common/Navbar';
import { Home } from './views/Home';
import styled from 'styled-components/macro';

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const App = () => {
  return (
    <StyledContainer>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </BrowserRouter>
    </StyledContainer>
  );
};
