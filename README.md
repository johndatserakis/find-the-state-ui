Work in progress...

## MUI

### Default Breakpoints

https://material-ui.com/customization/breakpoints/

Using md 960 as main breakpoint. But using lg for breakpoint in container.

- xs, extra-small: 0px
- sm, small: 600px
- md, medium: 960px
- lg, large: 1280px
- xl, extra-large: 1920px

## Container

https://material-ui.com/components/container/

Make sure all base content is wrapped in a `Container` and use a consistent maxWidth across the app.

```tsx
<Container maxWidth="lg">...</Container>
```

## Grid

https://material-ui.com/components/grid/

For some reason the main `Grid` from MUI doesn't come with a full height and width. Import the `Grid` from `'./components/mui/Grid'` to get that added by default.

## Access MUI styles in Styled-Components

https://material-ui.com/guides/interoperability/#theme

```tsx
const Container = styled.div`
  background-color: ${({ theme }) => theme.palette.primary.main};
  box-shadow: ${({ theme }) => theme.shadows[3]};
`;
```
