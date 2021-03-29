import styled from 'styled-components/macro';

const Container = styled.div`
  display: flex;
  align-items: center;

  .icon-left {
    margin-right: 0.375rem;
  }

  .icon-right {
    margin-left: 0.375rem;
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
      <span className="icon-left">{iconLeft && iconLeft}</span> {item}{' '}
      <span className="icon-right">{iconRight && iconRight}</span>
    </Container>
  );
};
