import { Link } from '@material-ui/core';

export const CoffeeButton = () => {
  return (
    <Link href="https://ko-fi.com/J3J14BTMT" target="_blank" rel="noopener noreferrer">
      <img
        style={{ border: '0', height: '36px' }}
        src="https://cdn.ko-fi.com/cdn/kofi1.png?v=2"
        alt="Buy Me a Coffee at ko-fi.com"
      />
    </Link>
  );
};
