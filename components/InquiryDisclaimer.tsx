import * as React from 'react';

interface InquiryDisclaimerProps {
  isChecked: boolean;
  onToggle: (isChecked: boolean) => void;
}

const InquiryDisclaimer: React.FC<InquiryDisclaimerProps> = ({ isChecked, onToggle }) => {
  return (
    <div className="mt-4 p-3 bg-blue-50 border border-blue-200 rounded-md">
      <div className="flex items-start">
        <div className="flex-shrink-0">
          <input
            id="disclaimer-checkbox"
            name="disclaimer-checkbox"
            type="checkbox"
            checked={isChecked}
            onChange={(e) => onToggle(e.target.checked)}
            className="h-4 w-4 text-brand-primary border-gray-300 rounded focus:ring-brand-primary mt-1"
          />
        </div>
        <div className="ml-3">
          <label htmlFor="disclaimer-checkbox" className="text-sm font-medium text-blue-800">
            Acknowledge Before Sending
          </label>
          <p className="text-xs text-blue-700 mt-1">
            I understand that this is a request for availability and not a confirmed booking. A reservations agent will contact me to confirm availability and finalize my booking.
          </p>
        </div>
      </div>
    </div>
  );
};

export default InquiryDisclaimer;
