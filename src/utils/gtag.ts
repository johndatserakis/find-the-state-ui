const GA_ID = 'G-T6QXNFJRDR';

interface GtagOpts {
  action: 'click' | 'submit';
  category?: string;
  label?: string;
  value?: number;
}

export const event = ({ action, category, label, value }: GtagOpts) => {
  // Example:
  // gtag("click", "Create new event", "Success");
  // gtag("submit", "Send emails", "Success");

  window.gtag('event', action, {
    event_category: category,
    event_label: label,
    value: value,
  });
};

export const disable = () => {
  // https://developers.google.com/analytics/devguides/collection/gtagjs/display-features
  window.gtag('set', 'allow_google_signals', false);
  window.gtag('config', GA_ID, { allow_google_signals: false });
  window.gtag('set', 'allow_ad_personalization_signals', false);
  window.gtag('config', GA_ID, { allow_ad_personalization_signals: false });

  // https://developers.google.com/analytics/devguides/collection/gtagjs/user-opt-out
  // @ts-ignore
  window[`ga-disable-${GA_ID}`] = true;
};

export const enable = () => {
  // https://developers.google.com/analytics/devguides/collection/gtagjs/display-features
  window.gtag('set', 'allow_google_signals', true);
  window.gtag('config', GA_ID, { allow_google_signals: true });
  window.gtag('set', 'allow_ad_personalization_signals', true);
  window.gtag('config', GA_ID, { allow_ad_personalization_signals: true });

  // https://developers.google.com/analytics/devguides/collection/gtagjs/user-opt-out
  // @ts-ignore
  window[`ga-disable-${GA_ID}`] = false;
};
