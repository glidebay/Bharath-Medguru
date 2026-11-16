"use client";

export interface BookingModalProps {
  isOpen?: boolean;
  onClose?: () => void;
  initialPractitioner?: string;
  initialService?: string;
}

// Deprecated: All consultation and contact requests now scroll directly
// to the on-page "Get In Touch" section (#contact).
export default function BookingModal({
  isOpen = false,
  onClose,
  initialPractitioner,
  initialService,
}: BookingModalProps = {}) {
  return null;
}
