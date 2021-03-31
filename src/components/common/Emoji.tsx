// https://github.com/SeanMcP/a11y-react-emoji/blob/master/src/Emoji.tsx#L15
// https://medium.com/@seanmcp/%EF%B8%8F-how-to-use-emojis-in-react-d23bbf608bf7

interface EmojiProps extends React.HTMLAttributes<HTMLSpanElement> {
  label?: string;
  symbol: string;
}

export const Emoji = (props: EmojiProps) => {
  const { label, symbol, ...rest } = props;
  return (
    <span aria-hidden={label ? undefined : true} aria-label={label ? label : undefined} role="img" {...rest}>
      {symbol}
    </span>
  );
};
