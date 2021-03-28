import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  align-items: center;

  svg {
    margin-right: 0.375rem;
  }
`;

interface IconWithItemProps {
  iconLeft?: JSX.Element;
  iconRight?: JSX.Element;
  item: JSX.Element;
}

export const IconWithItem = ({ iconLeft, iconRight, item }: IconWithItemProps) => {
  return (
    <Container>
      {iconLeft && iconLeft} {item} {iconRight && iconRight}
    </Container>
  );
};
