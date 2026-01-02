declare module 'react-whatsapp-widget' {
  import { ComponentType } from 'react';

  interface WhatsAppWidgetProps {
    phoneNumber: string;
    companyName?: string;
    replyTimeText?: string;
    message?: string;
    sendButtonText?: string;
    inputPlaceHolder?: string;
    CompanyIcon?: ComponentType;
    open?: boolean;
  }

  export const WhatsAppWidget: (props: WhatsAppWidgetProps) => JSX.Element;
}