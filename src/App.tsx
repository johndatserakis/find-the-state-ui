import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar } from './components/Navbar';
import { Home } from './views/Home';
import { About } from './views/About';
import styled from 'styled-components/macro';

const StyledContainer = styled.div`
  height: 100%;
  width: 100%;
`;

export const App = () => {
  return (
    <StyledContainer>
      <Navbar />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
        </Routes>
      </BrowserRouter>
    </StyledContainer>
  );
};
