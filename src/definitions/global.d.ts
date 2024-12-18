declare global {
  interface Window {
    Userback: any;
    XR8: any;
    dataLayer: any;
    gtag_report_conversion: (url?: string) => boolean;
    userpilot: { destroy: () => void }
  }
}

export {};
