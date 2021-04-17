// Customizing this Dialog in order to make the slide up/down the default transition

/*
TODO: Look into error: Warning: findDOMNode is deprecated in StrictMode. findDOMNode was passed an instance of Transition which is inside StrictMode. Instead, add a ref directly to the element you want to reference. Learn more about using refs safely here: https://reactjs.org/link/strict-mode-find-node
*/

import { forwardRef, ReactNode } from 'react';
import { Dialog as MuiDialog, DialogProps as MuiDialogProps, Slide, SlideProps } from '@material-ui/core';

// https://github.com/mui-org/material-ui/issues/17542#issuecomment-663845119
const Transition = forwardRef<unknown, SlideProps>((props, ref) => <Slide direction="up" ref={ref} {...props} />);

interface DialogProps extends MuiDialogProps {
  children?: ReactNode;
}

export const Dialog = (props: DialogProps) => {
  return <MuiDialog TransitionComponent={Transition} {...props}></MuiDialog>;
};
