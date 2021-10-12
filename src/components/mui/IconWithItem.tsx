import styled from 'styled-components';
import { pxToRem } from '../../utils/style';

const Container = styled.div`
  display: flex;
  align-items: center;

  .icon-left {
    margin-right: ${pxToRem(6)};
  }

  .icon-right {
    margin-left: ${pxToRem(6)};
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
