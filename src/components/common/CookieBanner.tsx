import CookieConsent from 'react-cookie-consent';
import { disable, enable } from '../../utils/gtag';
import { Button } from '@material-ui/core';
import { colors } from '../../style/colors';
import { useCookie } from 'react-use';
import { useEffect } from 'react';

const COOKIE_NAME = 'find-the-state-banner';

enum CookieValue {
  ACCEPTED = 'accepted',
  DECLINED = 'declined',
}

export const CookieBanner = () => {
  // CookieConsent handles the actual setting of the cookie - we're just grabbing this to check it ourselves
  const [value] = useCookie(COOKIE_NAME);

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
    <CookieConsent
      ButtonComponent={Button}
      buttonText="Got It"
      cookieName={COOKIE_NAME}
      cookieValue={CookieValue.ACCEPTED}
      declineButtonText="Opt Out"
      declineCookieValue={CookieValue.DECLINED}
      enableDeclineButton
      onDecline={disable}
      style={{ background: colors.black, opacity: '0.85', alignItems: 'center' }}
      contentStyle={{ color: colors.white, fontSize: '14px', margin: '0', padding: '8px' }}
      declineButtonStyle={{
        backgroundColor: colors.red[400],
        border: `1px solid ${colors.red[600]}`,
        color: colors.white,
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '0',
        opacity: '0.85',
      }}
      buttonStyle={{
        backgroundColor: colors.green[400],
        border: `1px solid ${colors.green[600]}`,
        color: colors.white,
        fontSize: '14px',
        fontWeight: 'bold',
        margin: '0',
        opacity: '0.85',
      }}
    >
      We use cookies to ensure you get the best experience.
    </CookieConsent>
  );
};
