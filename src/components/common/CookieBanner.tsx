import { useEffect } from 'react';
import { Button, useMediaQuery } from '@mui/material';
import CookieConsent from 'react-cookie-consent';
import { useCookie } from 'react-use';
import styled from 'styled-components';
import { colors } from '../../styles/colors';
import { theme } from '../../styles/theme';
import { disable, enable } from '../../utils/gtag';

const COOKIE_NAME = 'find-the-state-banner';

enum CookieValue {
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

const Container = styled.div`
  .button-wrapper {
    width: 100%;

    ${theme.breakpoints.up('sm')} {
      width: auto;
    }
  }
`;

export const CookieBanner = () => {
  // CookieConsent handles the actual setting of the cookie - we're just grabbing this to check it ourselves
  const [value] = useCookie(COOKIE_NAME);
  const isDesktop = useMediaQuery(theme.breakpoints.up('sm'));

  // The main logic is in the actual decline handling, but we still need to make sure to enable/disable on iniital load
  // (mainly the disable)
  useEffect(() => {
    if (value === CookieValue.DECLINED) {
      disable();
    }

    if (value === CookieValue.ACCEPTED) {
      enable();
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <Container>
      <CookieConsent
        ButtonComponent={Button}
        buttonText="Got It"
        cookieName={COOKIE_NAME}
        cookieValue={CookieValue.ACCEPTED}
        declineButtonText="Opt Out"
        declineCookieValue={CookieValue.DECLINED}
        enableDeclineButton
        onDecline={disable}
        style={{
          background: colors.black,
          opacity: '0.85',
          alignItems: 'center',
          flexDirection: isDesktop ? 'row' : 'column',
          flexWrap: 'nowrap',
        }}
        contentStyle={{
          color: colors.white,
          fontSize: '14px',
          margin: '0',
          padding: '8px',
          flex: isDesktop ? '1 0 300px' : '1 0',
        }}
        declineButtonStyle={{
          backgroundColor: colors.red[400],
          border: `1px solid ${colors.red[600]}`,
          color: colors.white,
          fontSize: '14px',
          fontWeight: 'bold',
          margin: '0',
          opacity: '0.85',
          width: isDesktop ? 'auto' : '50%',
        }}
        buttonStyle={{
          backgroundColor: colors.green[400],
          border: `1px solid ${colors.green[600]}`,
          color: colors.white,
          fontSize: '14px',
          fontWeight: 'bold',
          margin: '0',
          opacity: '0.85',
          width: isDesktop ? 'auto' : '50%',
        }}
        buttonWrapperClasses={'button-wrapper'}
      >
        We use cookies to improve your experience on this website.
      </CookieConsent>
    </Container>
  );
};
