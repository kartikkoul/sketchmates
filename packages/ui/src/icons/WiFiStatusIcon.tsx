"use client";

type WifiStatusIconProps = {
  online: boolean;
  size?: number;
};

const WifiStatusIcon = ({ online, size = 24 }: WifiStatusIconProps) => {
  if (online) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        aria-label="Online"
      >
        <path
          d="M2 8C7.5 3.5 16.5 3.5 22 8"
          stroke="#16A34A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M5 11C8.5 8.5 15.5 8.5 19 11"
          stroke="#16A34A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <path
          d="M8.5 14C10.5 12.5 13.5 12.5 15.5 14"
          stroke="#16A34A"
          strokeWidth="2"
          strokeLinecap="round"
        />
        <circle cx="12" cy="18" r="1.5" fill="#16A34A" />
      </svg>
    );
  }

  // Offline
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      aria-label="Offline"
    >
      <path
        d="M2 8C7.5 3.5 16.5 3.5 22 8"
        stroke="#DC2626"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M5 11C8.5 8.5 15.5 8.5 19 11"
        stroke="#DC2626"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M8.5 14C10.5 12.5 13.5 12.5 15.5 14"
        stroke="#DC2626"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <circle cx="12" cy="18" r="1.5" fill="#DC2626" />

      {/* Cross */}
      <line
        x1="4"
        y1="4"
        x2="20"
        y2="20"
        stroke="#DC2626"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <line
        x1="20"
        y1="4"
        x2="4"
        y2="20"
        stroke="#DC2626"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  );
};

export default WifiStatusIcon;
