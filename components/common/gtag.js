export const GA_TRACKING_ID = 'UA-103269071-1';
export const GA_TRACKING_ID2 = 'DC-8209718';
export const GA_TRACKING_ID3 = 'DC-8388319';

export const pageview = url => {
  window.gtag('config', GA_TRACKING_ID, {
    page_location: url,
  });
};

export const event = sendTo => {
  window.gtag('event', 'conversion', {
    allow_custom_scripts: true,
    send_to: sendTo,
  });
};
