import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "motion/react";

import {
  Mail,
  ArrowRight,
  ArrowLeft,
  Send,
  Paperclip,
  Eye,
  EyeOff,
  Clock,
  Calendar,
  Bell,
  Check,
  Search,
} from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Login — Wisps" },
      {
        name: "description",
        content:
          "Sign in to Wisps — the AI-native inbox that learns how you write and handles the busywork.",
      },
    ],
  }),
  component: LoginPage,
});

/* ─── Animation variants ─── */
const fadeUp = {
  hidden: { opacity: 0, y: 20 },
  show: (i: number = 0) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.1,
      duration: 0.7,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

const fadeIn = {
  hidden: { opacity: 0 },
  show: (i: number = 0) => ({
    opacity: 1,
    transition: {
      delay: i * 0.12,
      duration: 0.6,
      ease: [0.22, 1, 0.36, 1] as const,
    },
  }),
};

/* ─── Social / SSO connector buttons ─── */
function GoogleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 48 48">
      <path
        fill="#EA4335"
        d="M24 9.5c3.54 0 6.71 1.22 9.21 3.6l6.85-6.85C35.9 2.38 30.47 0 24 0 14.62 0 6.51 5.38 2.56 13.22l7.98 6.19C12.43 13.72 17.74 9.5 24 9.5z"
      />
      <path
        fill="#4285F4"
        d="M46.98 24.55c0-1.57-.15-3.09-.38-4.55H24v9.02h12.94c-.58 2.96-2.26 5.48-4.78 7.18l7.73 6c4.51-4.18 7.09-10.36 7.09-17.65z"
      />
      <path
        fill="#FBBC05"
        d="M10.53 28.59c-.48-1.45-.76-2.99-.76-4.59s.27-3.14.76-4.59l-7.98-6.19C.92 16.46 0 20.12 0 24c0 3.88.92 7.54 2.56 10.78l7.97-6.19z"
      />
      <path
        fill="#34A853"
        d="M24 48c6.48 0 11.93-2.13 15.89-5.81l-7.73-6c-2.15 1.45-4.92 2.3-8.16 2.3-6.26 0-11.57-4.22-13.47-9.91l-7.98 6.19C6.51 42.62 14.62 48 24 48z"
      />
    </svg>
  );
}

function MicrosoftIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 21 21">
      <rect x="1" y="1" width="9" height="9" fill="#f25022" />
      <rect x="1" y="11" width="9" height="9" fill="#00a4ef" />
      <rect x="11" y="1" width="9" height="9" fill="#7fba00" />
      <rect x="11" y="11" width="9" height="9" fill="#ffb900" />
    </svg>
  );
}

function AppleIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 384 512" fill="currentColor">
      <path d="M318.7 268.7c-.2-36.7 16.4-64.4 50-84.8-18.8-27.1-46.9-42.2-83.7-45.4-35.2-3.1-73.7 20.8-87.9 20.8-15 0-49-19.8-74.8-19.8C63.1 140.2 0 185.3 0 273.5c0 26.2 4.8 53.3 14.4 81.2 12.8 36.8 59 127.1 107.2 125.6 25.1-.6 42.8-18 75.4-18 31.5 0 48.1 18 76.4 17.4 48.5-.8 90.1-82.4 102.4-119.3-65.1-30.9-62.1-90.5-62.1-91.7zm-56.5-142c27.5-32.7 24.7-62.6 24-72.5-23.8 1.4-51.4 16.3-67.3 34.8-17.2 20-27.2 44.5-25.1 71.9 26 2 49.9-13.7 68.4-34.2z" />
    </svg>
  );
}

function SlackIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 127 127">
      <path
        d="M27.2 80c0 7.3-5.9 13.2-13.2 13.2C6.7 93.2.8 87.3.8 80c0-7.3 5.9-13.2 13.2-13.2h13.2V80zm6.6 0c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v33c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V80z"
        fill="#E01E5A"
      />
      <path
        d="M47 27c-7.3 0-13.2-5.9-13.2-13.2C33.8 6.5 39.7.6 47 .6c7.3 0 13.2 5.9 13.2 13.2V27H47zm0 6.7c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H14c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33z"
        fill="#36C5F0"
      />
      <path
        d="M99.9 46.9c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2H99.9V46.9zm-6.6 0c0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V14c0-7.3 5.9-13.2 13.2-13.2 7.3 0 13.2 5.9 13.2 13.2v32.9z"
        fill="#2EB67D"
      />
      <path
        d="M80.1 99.8c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2-7.3 0-13.2-5.9-13.2-13.2V99.8h13.2zm0-6.6c-7.3 0-13.2-5.9-13.2-13.2 0-7.3 5.9-13.2 13.2-13.2h33c7.3 0 13.2 5.9 13.2 13.2 0 7.3-5.9 13.2-13.2 13.2h-33z"
        fill="#ECB22E"
      />
    </svg>
  );
}

/* ─── Connector Button Component ─── */
function ConnectorButton({
  icon,
  label,
  onClick,
  delay = 0,
}: {
  icon: React.ReactNode;
  label: string;
  onClick?: () => void;
  delay?: number;
}) {
  return (
    <motion.button
      variants={fadeUp}
      initial="hidden"
      animate="show"
      custom={delay}
      onClick={onClick}
      className="group relative flex w-full items-center gap-3 rounded-xl border border-border/60 bg-white px-5 py-3.5 text-[15px] font-medium text-foreground shadow-sm transition-all duration-200 hover:border-foreground/20 hover:shadow-md hover:bg-secondary/50 active:scale-[0.98] cursor-pointer"
    >
      <span className="flex h-6 w-6 shrink-0 items-center justify-center">{icon}</span>
      <span>{label}</span>
      <ArrowRight className="ml-auto h-4 w-4 opacity-0 -translate-x-2 transition-all duration-200 group-hover:opacity-60 group-hover:translate-x-0" />
    </motion.button>
  );
}

/* ─── Main Login Page ─── */

const COUNTRIES = [
  { code: 'AF', dial: '+93', name: 'Afghanistan', flag: '🇦🇫' },
  { code: 'AL', dial: '+355', name: 'Albania', flag: '🇦🇱' },
  { code: 'DZ', dial: '+213', name: 'Algeria', flag: '🇩🇿' },
  { code: 'AS', dial: '+1', name: 'American Samoa', flag: '🇦🇸' },
  { code: 'AD', dial: '+376', name: 'Andorra', flag: '🇦🇩' },
  { code: 'AO', dial: '+244', name: 'Angola', flag: '🇦🇴' },
  { code: 'AI', dial: '+1', name: 'Anguilla', flag: '🇦🇮' },
  { code: 'AQ', dial: '+672', name: 'Antarctica', flag: '🇦🇶' },
  { code: 'AG', dial: '+1', name: 'Antigua and Barbuda', flag: '🇦🇬' },
  { code: 'AR', dial: '+54', name: 'Argentina', flag: '🇦🇷' },
  { code: 'AM', dial: '+374', name: 'Armenia', flag: '🇦🇲' },
  { code: 'AW', dial: '+297', name: 'Aruba', flag: '🇦🇼' },
  { code: 'AU', dial: '+61', name: 'Australia', flag: '🇦🇺' },
  { code: 'AT', dial: '+43', name: 'Austria', flag: '🇦🇹' },
  { code: 'AZ', dial: '+994', name: 'Azerbaijan', flag: '🇦🇿' },
  { code: 'BS', dial: '+1', name: 'Bahamas', flag: '🇧🇸' },
  { code: 'BH', dial: '+973', name: 'Bahrain', flag: '🇧🇭' },
  { code: 'BD', dial: '+880', name: 'Bangladesh', flag: '🇧🇩' },
  { code: 'BB', dial: '+1', name: 'Barbados', flag: '🇧🇧' },
  { code: 'BY', dial: '+375', name: 'Belarus', flag: '🇧🇾' },
  { code: 'BE', dial: '+32', name: 'Belgium', flag: '🇧🇪' },
  { code: 'BZ', dial: '+501', name: 'Belize', flag: '🇧🇿' },
  { code: 'BJ', dial: '+229', name: 'Benin', flag: '🇧🇯' },
  { code: 'BM', dial: '+1', name: 'Bermuda', flag: '🇧🇲' },
  { code: 'BT', dial: '+975', name: 'Bhutan', flag: '🇧🇹' },
  { code: 'BO', dial: '+591', name: 'Bolivia', flag: '🇧🇴' },
  { code: 'BA', dial: '+387', name: 'Bosnia and Herzegovina', flag: '🇧🇦' },
  { code: 'BW', dial: '+267', name: 'Botswana', flag: '🇧🇼' },
  { code: 'BR', dial: '+55', name: 'Brazil', flag: '🇧🇷' },
  { code: 'IO', dial: '+246', name: 'British Indian Ocean Territory', flag: '🇮🇴' },
  { code: 'VG', dial: '+1', name: 'British Virgin Islands', flag: '🇻🇬' },
  { code: 'BN', dial: '+673', name: 'Brunei', flag: '🇧🇳' },
  { code: 'BG', dial: '+359', name: 'Bulgaria', flag: '🇧🇬' },
  { code: 'BF', dial: '+226', name: 'Burkina Faso', flag: '🇧🇫' },
  { code: 'BI', dial: '+257', name: 'Burundi', flag: '🇧🇮' },
  { code: 'KH', dial: '+855', name: 'Cambodia', flag: '🇰🇭' },
  { code: 'CM', dial: '+237', name: 'Cameroon', flag: '🇨🇲' },
  { code: 'CA', dial: '+1', name: 'Canada', flag: '🇨🇦' },
  { code: 'CV', dial: '+238', name: 'Cape Verde', flag: '🇨🇻' },
  { code: 'KY', dial: '+1', name: 'Cayman Islands', flag: '🇰🇾' },
  { code: 'CF', dial: '+236', name: 'Central African Republic', flag: '🇨🇫' },
  { code: 'TD', dial: '+235', name: 'Chad', flag: '🇹🇩' },
  { code: 'CL', dial: '+56', name: 'Chile', flag: '🇨🇱' },
  { code: 'CN', dial: '+86', name: 'China', flag: '🇨🇳' },
  { code: 'CX', dial: '+61', name: 'Christmas Island', flag: '🇨🇽' },
  { code: 'CC', dial: '+61', name: 'Cocos Islands', flag: '🇨🇨' },
  { code: 'CO', dial: '+57', name: 'Colombia', flag: '🇨🇴' },
  { code: 'KM', dial: '+269', name: 'Comoros', flag: '🇰🇲' },
  { code: 'CK', dial: '+682', name: 'Cook Islands', flag: '🇨🇰' },
  { code: 'CR', dial: '+506', name: 'Costa Rica', flag: '🇨🇷' },
  { code: 'HR', dial: '+385', name: 'Croatia', flag: '🇭🇷' },
  { code: 'CU', dial: '+53', name: 'Cuba', flag: '🇨🇺' },
  { code: 'CW', dial: '+599', name: 'Curacao', flag: '🇨🇼' },
  { code: 'CY', dial: '+357', name: 'Cyprus', flag: '🇨🇾' },
  { code: 'CZ', dial: '+420', name: 'Czech Republic', flag: '🇨🇿' },
  { code: 'CD', dial: '+243', name: 'Democratic Republic of the Congo', flag: '🇨🇩' },
  { code: 'DK', dial: '+45', name: 'Denmark', flag: '🇩🇰' },
  { code: 'DJ', dial: '+253', name: 'Djibouti', flag: '🇩🇯' },
  { code: 'DM', dial: '+1', name: 'Dominica', flag: '🇩🇲' },
  { code: 'DO', dial: '+1', name: 'Dominican Republic', flag: '🇩🇴' },
  { code: 'TL', dial: '+670', name: 'East Timor', flag: '🇹🇱' },
  { code: 'EC', dial: '+593', name: 'Ecuador', flag: '🇪🇨' },
  { code: 'EG', dial: '+20', name: 'Egypt', flag: '🇪🇬' },
  { code: 'SV', dial: '+503', name: 'El Salvador', flag: '🇸🇻' },
  { code: 'GQ', dial: '+240', name: 'Equatorial Guinea', flag: '🇬🇶' },
  { code: 'ER', dial: '+291', name: 'Eritrea', flag: '🇪🇷' },
  { code: 'EE', dial: '+372', name: 'Estonia', flag: '🇪🇪' },
  { code: 'ET', dial: '+251', name: 'Ethiopia', flag: '🇪🇹' },
  { code: 'FK', dial: '+500', name: 'Falkland Islands', flag: '🇫🇰' },
  { code: 'FO', dial: '+298', name: 'Faroe Islands', flag: '🇫🇴' },
  { code: 'FJ', dial: '+679', name: 'Fiji', flag: '🇫🇯' },
  { code: 'FI', dial: '+358', name: 'Finland', flag: '🇫🇮' },
  { code: 'FR', dial: '+33', name: 'France', flag: '🇫🇷' },
  { code: 'PF', dial: '+689', name: 'French Polynesia', flag: '🇵🇫' },
  { code: 'GA', dial: '+241', name: 'Gabon', flag: '🇬🇦' },
  { code: 'GM', dial: '+220', name: 'Gambia', flag: '🇬🇲' },
  { code: 'GE', dial: '+995', name: 'Georgia', flag: '🇬🇪' },
  { code: 'DE', dial: '+49', name: 'Germany', flag: '🇩🇪' },
  { code: 'GH', dial: '+233', name: 'Ghana', flag: '🇬🇭' },
  { code: 'GI', dial: '+350', name: 'Gibraltar', flag: '🇬🇮' },
  { code: 'GR', dial: '+30', name: 'Greece', flag: '🇬🇷' },
  { code: 'GL', dial: '+299', name: 'Greenland', flag: '🇬🇱' },
  { code: 'GD', dial: '+1', name: 'Grenada', flag: '🇬🇩' },
  { code: 'GU', dial: '+1', name: 'Guam', flag: '🇬🇺' },
  { code: 'GT', dial: '+502', name: 'Guatemala', flag: '🇬🇹' },
  { code: 'GG', dial: '+44', name: 'Guernsey', flag: '🇬🇬' },
  { code: 'GN', dial: '+224', name: 'Guinea', flag: '🇬🇳' },
  { code: 'GW', dial: '+245', name: 'Guinea-Bissau', flag: '🇬🇼' },
  { code: 'GY', dial: '+592', name: 'Guyana', flag: '🇬🇾' },
  { code: 'HT', dial: '+509', name: 'Haiti', flag: '🇭🇹' },
  { code: 'HN', dial: '+504', name: 'Honduras', flag: '🇭🇳' },
  { code: 'HK', dial: '+852', name: 'Hong Kong', flag: '🇭🇰' },
  { code: 'HU', dial: '+36', name: 'Hungary', flag: '🇭🇺' },
  { code: 'IS', dial: '+354', name: 'Iceland', flag: '🇮🇸' },
  { code: 'IN', dial: '+91', name: 'India', flag: '🇮🇳' },
  { code: 'ID', dial: '+62', name: 'Indonesia', flag: '🇮🇩' },
  { code: 'IR', dial: '+98', name: 'Iran', flag: '🇮🇷' },
  { code: 'IQ', dial: '+964', name: 'Iraq', flag: '🇮🇶' },
  { code: 'IE', dial: '+353', name: 'Ireland', flag: '🇮🇪' },
  { code: 'IM', dial: '+44', name: 'Isle of Man', flag: '🇮🇲' },
  { code: 'IL', dial: '+972', name: 'Israel', flag: '🇮🇱' },
  { code: 'IT', dial: '+39', name: 'Italy', flag: '🇮🇹' },
  { code: 'CI', dial: '+225', name: 'Ivory Coast', flag: '🇨🇮' },
  { code: 'JM', dial: '+1', name: 'Jamaica', flag: '🇯🇲' },
  { code: 'JP', dial: '+81', name: 'Japan', flag: '🇯🇵' },
  { code: 'JE', dial: '+44', name: 'Jersey', flag: '🇯🇪' },
  { code: 'JO', dial: '+962', name: 'Jordan', flag: '🇯🇴' },
  { code: 'KZ', dial: '+7', name: 'Kazakhstan', flag: '🇰🇿' },
  { code: 'KE', dial: '+254', name: 'Kenya', flag: '🇰🇪' },
  { code: 'KI', dial: '+686', name: 'Kiribati', flag: '🇰🇮' },
  { code: 'XK', dial: '+383', name: 'Kosovo', flag: '🇽🇰' },
  { code: 'KW', dial: '+965', name: 'Kuwait', flag: '🇰🇼' },
  { code: 'KG', dial: '+996', name: 'Kyrgyzstan', flag: '🇰🇬' },
  { code: 'LA', dial: '+856', name: 'Laos', flag: '🇱🇦' },
  { code: 'LV', dial: '+371', name: 'Latvia', flag: '🇱🇻' },
  { code: 'LB', dial: '+961', name: 'Lebanon', flag: '🇱🇧' },
  { code: 'LS', dial: '+266', name: 'Lesotho', flag: '🇱🇸' },
  { code: 'LR', dial: '+231', name: 'Liberia', flag: '🇱🇷' },
  { code: 'LY', dial: '+218', name: 'Libya', flag: '🇱🇾' },
  { code: 'LI', dial: '+423', name: 'Liechtenstein', flag: '🇱🇮' },
  { code: 'LT', dial: '+370', name: 'Lithuania', flag: '🇱🇹' },
  { code: 'LU', dial: '+352', name: 'Luxembourg', flag: '🇱🇺' },
  { code: 'MO', dial: '+853', name: 'Macao', flag: '🇲🇴' },
  { code: 'MK', dial: '+389', name: 'Macedonia', flag: '🇲🇰' },
  { code: 'MG', dial: '+261', name: 'Madagascar', flag: '🇲🇬' },
  { code: 'MW', dial: '+265', name: 'Malawi', flag: '🇲🇼' },
  { code: 'MY', dial: '+60', name: 'Malaysia', flag: '🇲🇾' },
  { code: 'MV', dial: '+960', name: 'Maldives', flag: '🇲🇻' },
  { code: 'ML', dial: '+223', name: 'Mali', flag: '🇲🇱' },
  { code: 'MT', dial: '+356', name: 'Malta', flag: '🇲🇹' },
  { code: 'MH', dial: '+692', name: 'Marshall Islands', flag: '🇲🇭' },
  { code: 'MR', dial: '+222', name: 'Mauritania', flag: '🇲🇷' },
  { code: 'MU', dial: '+230', name: 'Mauritius', flag: '🇲🇺' },
  { code: 'YT', dial: '+262', name: 'Mayotte', flag: '🇾🇹' },
  { code: 'MX', dial: '+52', name: 'Mexico', flag: '🇲🇽' },
  { code: 'FM', dial: '+691', name: 'Micronesia', flag: '🇫🇲' },
  { code: 'MD', dial: '+373', name: 'Moldova', flag: '🇲🇩' },
  { code: 'MC', dial: '+377', name: 'Monaco', flag: '🇲🇨' },
  { code: 'MN', dial: '+976', name: 'Mongolia', flag: '🇲🇳' },
  { code: 'ME', dial: '+382', name: 'Montenegro', flag: '🇲🇪' },
  { code: 'MS', dial: '+1', name: 'Montserrat', flag: '🇲🇸' },
  { code: 'MA', dial: '+212', name: 'Morocco', flag: '🇲🇦' },
  { code: 'MZ', dial: '+258', name: 'Mozambique', flag: '🇲🇿' },
  { code: 'MM', dial: '+95', name: 'Myanmar', flag: '🇲🇲' },
  { code: 'NA', dial: '+264', name: 'Namibia', flag: '🇳🇦' },
  { code: 'NR', dial: '+674', name: 'Nauru', flag: '🇳🇷' },
  { code: 'NP', dial: '+977', name: 'Nepal', flag: '🇳🇵' },
  { code: 'NL', dial: '+31', name: 'Netherlands', flag: '🇳🇱' },
  { code: 'NC', dial: '+687', name: 'New Caledonia', flag: '🇳🇨' },
  { code: 'NZ', dial: '+64', name: 'New Zealand', flag: '🇳🇿' },
  { code: 'NI', dial: '+505', name: 'Nicaragua', flag: '🇳🇮' },
  { code: 'NE', dial: '+227', name: 'Niger', flag: '🇳🇪' },
  { code: 'NG', dial: '+234', name: 'Nigeria', flag: '🇳🇬' },
  { code: 'NU', dial: '+683', name: 'Niue', flag: '🇳🇺' },
  { code: 'KP', dial: '+850', name: 'North Korea', flag: '🇰🇵' },
  { code: 'MP', dial: '+1', name: 'Northern Mariana Islands', flag: '🇲🇵' },
  { code: 'NO', dial: '+47', name: 'Norway', flag: '🇳🇴' },
  { code: 'OM', dial: '+968', name: 'Oman', flag: '🇴🇲' },
  { code: 'PK', dial: '+92', name: 'Pakistan', flag: '🇵🇰' },
  { code: 'PW', dial: '+680', name: 'Palau', flag: '🇵🇼' },
  { code: 'PS', dial: '+970', name: 'Palestine', flag: '🇵🇸' },
  { code: 'PA', dial: '+507', name: 'Panama', flag: '🇵🇦' },
  { code: 'PG', dial: '+675', name: 'Papua New Guinea', flag: '🇵🇬' },
  { code: 'PY', dial: '+595', name: 'Paraguay', flag: '🇵🇾' },
  { code: 'PE', dial: '+51', name: 'Peru', flag: '🇵🇪' },
  { code: 'PH', dial: '+63', name: 'Philippines', flag: '🇵🇭' },
  { code: 'PN', dial: '+64', name: 'Pitcairn', flag: '🇵🇳' },
  { code: 'PL', dial: '+48', name: 'Poland', flag: '🇵🇱' },
  { code: 'PT', dial: '+351', name: 'Portugal', flag: '🇵🇹' },
  { code: 'PR', dial: '+1', name: 'Puerto Rico', flag: '🇵🇷' },
  { code: 'QA', dial: '+974', name: 'Qatar', flag: '🇶🇦' },
  { code: 'CG', dial: '+242', name: 'Republic of the Congo', flag: '🇨🇬' },
  { code: 'RE', dial: '+262', name: 'Reunion', flag: '🇷🇪' },
  { code: 'RO', dial: '+40', name: 'Romania', flag: '🇷🇴' },
  { code: 'RU', dial: '+7', name: 'Russia', flag: '🇷🇺' },
  { code: 'RW', dial: '+250', name: 'Rwanda', flag: '🇷🇼' },
  { code: 'BL', dial: '+590', name: 'Saint Barthelemy', flag: '🇧🇱' },
  { code: 'SH', dial: '+290', name: 'Saint Helena', flag: '🇸🇭' },
  { code: 'KN', dial: '+1', name: 'Saint Kitts and Nevis', flag: '🇰🇳' },
  { code: 'LC', dial: '+1', name: 'Saint Lucia', flag: '🇱🇨' },
  { code: 'MF', dial: '+590', name: 'Saint Martin', flag: '🇲🇫' },
  { code: 'PM', dial: '+508', name: 'Saint Pierre and Miquelon', flag: '🇵🇲' },
  { code: 'VC', dial: '+1', name: 'Saint Vincent and the Grenadines', flag: '🇻🇨' },
  { code: 'WS', dial: '+685', name: 'Samoa', flag: '🇼🇸' },
  { code: 'SM', dial: '+378', name: 'San Marino', flag: '🇸🇲' },
  { code: 'ST', dial: '+239', name: 'Sao Tome and Principe', flag: '🇸🇹' },
  { code: 'SA', dial: '+966', name: 'Saudi Arabia', flag: '🇸🇦' },
  { code: 'SN', dial: '+221', name: 'Senegal', flag: '🇸🇳' },
  { code: 'RS', dial: '+381', name: 'Serbia', flag: '🇷🇸' },
  { code: 'SC', dial: '+248', name: 'Seychelles', flag: '🇸🇨' },
  { code: 'SL', dial: '+232', name: 'Sierra Leone', flag: '🇸🇱' },
  { code: 'SG', dial: '+65', name: 'Singapore', flag: '🇸🇬' },
  { code: 'SX', dial: '+1', name: 'Sint Maarten', flag: '🇸🇽' },
  { code: 'SK', dial: '+421', name: 'Slovakia', flag: '🇸🇰' },
  { code: 'SI', dial: '+386', name: 'Slovenia', flag: '🇸🇮' },
  { code: 'SB', dial: '+677', name: 'Solomon Islands', flag: '🇸🇧' },
  { code: 'SO', dial: '+252', name: 'Somalia', flag: '🇸🇴' },
  { code: 'ZA', dial: '+27', name: 'South Africa', flag: '🇿🇦' },
  { code: 'KR', dial: '+82', name: 'South Korea', flag: '🇰🇷' },
  { code: 'SS', dial: '+211', name: 'South Sudan', flag: '🇸🇸' },
  { code: 'ES', dial: '+34', name: 'Spain', flag: '🇪🇸' },
  { code: 'LK', dial: '+94', name: 'Sri Lanka', flag: '🇱🇰' },
  { code: 'SD', dial: '+249', name: 'Sudan', flag: '🇸🇩' },
  { code: 'SR', dial: '+597', name: 'Suriname', flag: '🇸🇷' },
  { code: 'SJ', dial: '+47', name: 'Svalbard and Jan Mayen', flag: '🇸🇯' },
  { code: 'SZ', dial: '+268', name: 'Swaziland', flag: '🇸🇿' },
  { code: 'SE', dial: '+46', name: 'Sweden', flag: '🇸🇪' },
  { code: 'CH', dial: '+41', name: 'Switzerland', flag: '🇨🇭' },
  { code: 'SY', dial: '+963', name: 'Syria', flag: '🇸🇾' },
  { code: 'TW', dial: '+886', name: 'Taiwan', flag: '🇹🇼' },
  { code: 'TJ', dial: '+992', name: 'Tajikistan', flag: '🇹🇯' },
  { code: 'TZ', dial: '+255', name: 'Tanzania', flag: '🇹🇿' },
  { code: 'TH', dial: '+66', name: 'Thailand', flag: '🇹🇭' },
  { code: 'TG', dial: '+228', name: 'Togo', flag: '🇹🇬' },
  { code: 'TK', dial: '+690', name: 'Tokelau', flag: '🇹🇰' },
  { code: 'TO', dial: '+676', name: 'Tonga', flag: '🇹🇴' },
  { code: 'TT', dial: '+1', name: 'Trinidad and Tobago', flag: '🇹🇹' },
  { code: 'TN', dial: '+216', name: 'Tunisia', flag: '🇹🇳' },
  { code: 'TR', dial: '+90', name: 'Turkey', flag: '🇹🇷' },
  { code: 'TM', dial: '+993', name: 'Turkmenistan', flag: '🇹🇲' },
  { code: 'TC', dial: '+1', name: 'Turks and Caicos Islands', flag: '🇹🇨' },
  { code: 'TV', dial: '+688', name: 'Tuvalu', flag: '🇹🇻' },
  { code: 'VI', dial: '+1', name: 'U.S. Virgin Islands', flag: '🇻🇮' },
  { code: 'UG', dial: '+256', name: 'Uganda', flag: '🇺🇬' },
  { code: 'UA', dial: '+380', name: 'Ukraine', flag: '🇺🇦' },
  { code: 'AE', dial: '+971', name: 'United Arab Emirates', flag: '🇦🇪' },
  { code: 'GB', dial: '+44', name: 'United Kingdom', flag: '🇬🇧' },
  { code: 'US', dial: '+1', name: 'United States', flag: '🇺🇸' },
  { code: 'UY', dial: '+598', name: 'Uruguay', flag: '🇺🇾' },
  { code: 'UZ', dial: '+998', name: 'Uzbekistan', flag: '🇺🇿' },
  { code: 'VU', dial: '+678', name: 'Vanuatu', flag: '🇻🇺' },
  { code: 'VA', dial: '+379', name: 'Vatican', flag: '🇻🇦' },
  { code: 'VE', dial: '+58', name: 'Venezuela', flag: '🇻🇪' },
  { code: 'VN', dial: '+84', name: 'Vietnam', flag: '🇻🇳' },
  { code: 'WF', dial: '+681', name: 'Wallis and Futuna', flag: '🇼🇫' },
  { code: 'EH', dial: '+212', name: 'Western Sahara', flag: '🇪🇭' },
  { code: 'YE', dial: '+967', name: 'Yemen', flag: '🇾🇪' },
  { code: 'ZM', dial: '+260', name: 'Zambia', flag: '🇿🇲' },
  { code: 'ZW', dial: '+263', name: 'Zimbabwe', flag: '🇿🇼' }
];

function LoginPage() {

  const [showEmailForm, setShowEmailForm] = useState(false);
  const [isOtpStep, setIsOtpStep] = useState(false);
  const [showCountryDropdown, setShowCountryDropdown] = useState(false);
  const [searchCountry, setSearchCountry] = useState("");
  const [selectedCountry, setSelectedCountry] = useState(COUNTRIES.find(c => c.code === 'IN') || COUNTRIES[0]); // Default India

  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* ─── LEFT PANEL: Brand / Content (Shotbase-inspired) ─── */}
      <div className="relative hidden lg:flex lg:w-[52%] flex-col overflow-hidden">
        {/* Soft warm gradient background */}
        <div
          className="absolute inset-0"
          style={{
            background:
              "linear-gradient(165deg, oklch(0.95 0.04 30) 0%, oklch(0.94 0.06 350) 30%, oklch(0.92 0.05 320) 60%, oklch(0.96 0.03 280) 100%)",
          }}
        />

        {/* Subtle animated warm orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <motion.div
            animate={{
              x: [0, 30, -15, 0],
              y: [0, -25, 15, 0],
              scale: [1, 1.15, 0.95, 1],
            }}
            transition={{ duration: 22, repeat: Infinity, ease: "easeInOut" }}
            className="absolute -top-10 right-10 h-72 w-72 rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.88 0.1 30 / 0.4) 0%, transparent 70%)",
            }}
          />
          <motion.div
            animate={{
              x: [0, -20, 25, 0],
              y: [0, 30, -15, 0],
              scale: [1, 0.9, 1.1, 1],
            }}
            transition={{
              duration: 26,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 4,
            }}
            className="absolute bottom-32 -left-8 h-56 w-56 rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.85 0.12 300 / 0.3) 0%, transparent 70%)",
            }}
          />
          <motion.div
            animate={{
              x: [0, 15, -20, 0],
              y: [0, -15, 25, 0],
            }}
            transition={{
              duration: 20,
              repeat: Infinity,
              ease: "easeInOut",
              delay: 7,
            }}
            className="absolute top-1/3 left-1/4 h-44 w-44 rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.9 0.08 50 / 0.25) 0%, transparent 70%)",
            }}
          />
        </div>

        {/* Content — centered like the reference */}
        <div className="relative z-10 flex flex-1 flex-col items-center justify-between p-10 xl:p-14">
          {/* Top bar: logo + mute icon area */}
          <div className="flex w-full items-center justify-between">
            <motion.a
              href="/"
              variants={fadeIn}
              initial="hidden"
              animate="show"
              custom={0}
              className="flex items-center gap-2 text-foreground"
            >
              <img src="/wispsmascot.png" alt="Wisps logo" className="h-9 w-9 object-contain" />
              <span className="text-lg font-semibold tracking-tight">Wisps</span>
            </motion.a>
          </div>

          {/* Center: headline + description + product mockup */}
          <div className="flex flex-col items-center text-center max-w-lg -mt-4">
            <motion.h1
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={1}
              className="text-4xl xl:text-[2.75rem] font-semibold tracking-tight text-foreground leading-[1.08]"
            >
              Your first Wisps
              <br />
              moment
            </motion.h1>

            <motion.p
              variants={fadeUp}
              initial="hidden"
              animate="show"
              custom={2}
              className="mt-4 text-[15px] text-muted-foreground leading-relaxed max-w-sm"
            >
              Sign in and let Wisps learn how you write — it'll draft replies, sort your inbox, and
              handle the busywork for you.
            </motion.p>

            
          </div>

          {/* Bottom: back nav */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            custom={5}
            className="flex w-full items-center"
          >
            <a
              href="/"
              className="flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <ArrowLeft className="h-4 w-4" />
              <span>Back</span>
            </a>
          </motion.div>
        </div>
      </div>

      {/* ─── RIGHT PANEL: Login Form ─── */}
      <div className="flex flex-1 flex-col items-center justify-center px-6 py-12 sm:px-12 lg:px-16 bg-background">
        {/* Mobile logo (visible only on < lg) */}
        <motion.a
          href="/"
          variants={fadeIn}
          initial="hidden"
          animate="show"
          custom={0}
          className="flex items-center gap-2 text-foreground lg:hidden mb-10"
        >
          <img src="/wispsmascot.png" alt="Wisps logo" className="h-9 w-9 object-contain" />
          <span className="text-xl font-semibold tracking-tight">Wisps</span>
        </motion.a>

        <div className="w-full max-w-[400px]">
          {/* Header */}
          <motion.div variants={fadeUp} initial="hidden" animate="show" custom={0}>
            <div className="mb-6 hidden lg:block">
              <img src="/wispsmascot.png" alt="Wisps logo" className="h-10 w-10 object-contain" />
            </div>
            <h2 className="text-[28px] font-semibold tracking-tight text-foreground">
              {isOtpStep ? "Check your text bud!" : "Welcome back."}
            </h2>
            <p className="mt-2.5 text-[15px] text-muted-foreground/80 leading-relaxed max-w-[90%]">
              {isOtpStep 
                ? "Enter the 6 digit code we sent you" 
                : "Log in with the phone number or email you texted Wisps with."}
            </p>
          </motion.div>

          {/* Phone Input Form */}
          <motion.div
            variants={fadeUp}
            initial="hidden"
            animate="show"
            custom={1}
            className="mt-8 relative"
          >
            {!isOtpStep ? (
              <>
                <div className="flex items-center w-full h-[54px] rounded-full border border-border/70 bg-white px-2 shadow-sm transition-all focus-within:border-foreground/30 focus-within:ring-4 focus-within:ring-foreground/5 relative z-20">
              {/* Country code selector */}
              {!showEmailForm && (
                <>
                  <button
                    type="button"
                    onClick={() => setShowCountryDropdown(!showCountryDropdown)}
                    className="flex items-center gap-1.5 px-3 py-2 rounded-full hover:bg-secondary/50 transition-colors cursor-pointer text-sm font-medium"
                  >
                    <span className="text-lg leading-none">{selectedCountry.flag}</span>
                    <svg width="10" height="6" viewBox="0 0 10 6" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-muted-foreground ml-0.5">
                      <path d="M1 1L5 5L9 1" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </button>

                  {/* Divider */}
                  <div className="h-6 w-[1px] bg-border/60 mx-1" />
                </>
              )}

              {/* Phone/Email input */}
              <input
                type={showEmailForm ? "email" : "tel"}
                placeholder={showEmailForm ? "Enter your email" : "Enter your number here"}
                className="flex-1 bg-transparent border-none outline-none px-3 text-[15px] text-foreground font-medium placeholder:text-muted-foreground/50 w-full min-w-0"
                autoFocus
              />

              {/* Submit button */}
              <button 
                type="button" 
                onClick={() => setIsOtpStep(true)}
                className="w-[38px] h-[38px] rounded-full text-foreground flex items-center justify-center transition-all hover:scale-105 shadow-sm ml-2 cursor-pointer flex-shrink-0"
                style={{
                  background: "linear-gradient(165deg, oklch(0.95 0.04 30) 0%, oklch(0.94 0.06 350) 30%, oklch(0.92 0.05 320) 100%)",
                }}
              >
                <ArrowRight className="h-4.5 w-4.5 text-black/80" strokeWidth={2.5} />
              </button>
            </div>

            {/* Dropdown Menu */}
            {showCountryDropdown && (
              <div className="absolute left-0 bottom-[calc(100%+8px)] w-[320px] bg-white rounded-2xl shadow-xl shadow-black/[0.08] border border-black/[0.08] p-2 z-50 origin-bottom-left animate-in fade-in zoom-in-95 duration-200">
                {/* Search */}
                <div className="flex items-center gap-2 px-3 py-2.5 bg-secondary/60 rounded-xl mb-2">
                  <Search className="h-4 w-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Search country"
                    value={searchCountry}
                    onChange={(e) => setSearchCountry(e.target.value)}
                    className="bg-transparent border-none outline-none text-[13.5px] text-foreground w-full placeholder:text-muted-foreground"
                    autoFocus
                  />
                </div>
                {/* List */}
                <div className="max-h-[260px] overflow-y-auto pr-1 scrollbar-thin scrollbar-thumb-black/10 scrollbar-track-transparent">
                  {COUNTRIES.filter(c => c.name.toLowerCase().includes(searchCountry.toLowerCase())).map(c => (
                    <button
                      key={c.code}
                      type="button"
                      onClick={() => {
                        setSelectedCountry(c);
                        setShowCountryDropdown(false);
                        setSearchCountry("");
                      }}
                      className="w-full flex items-center justify-between px-3 py-2.5 hover:bg-secondary/60 rounded-xl transition-colors text-left"
                    >
                      <div className="flex items-center gap-3">
                        <span className="text-xl leading-none">{c.flag}</span>
                        <span className="text-[13.5px] text-foreground font-medium">{c.name}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <span className="text-[13px] text-muted-foreground/80">{c.dial}</span>
                        {selectedCountry.code === c.code && <Check className="h-4 w-4 text-foreground ml-1" />}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            )}

            {/* Click outside overlay */}
            {showCountryDropdown && (
              <div
                className="fixed inset-0 z-40"
                onClick={() => setShowCountryDropdown(false)}
              />
            )}
              </>
            ) : (
              <div className="flex gap-2.5 relative z-20 w-full justify-between max-w-[360px]">
                {[...Array(6)].map((_, i) => (
                  <input
                    key={i}
                    type="text"
                    maxLength={1}
                    className="w-[48px] h-[56px] rounded-2xl border border-black/[0.08] bg-white/90 backdrop-blur-md text-center text-2xl font-medium text-foreground focus:border-black/20 focus:ring-4 focus:ring-black/5 outline-none transition-all shadow-sm"
                    autoFocus={i === 0}
                  />
                ))}
              </div>
            )}
          </motion.div>

          {/* Email login link */}
          <motion.div
            variants={fadeIn}
            initial="hidden"
            animate="show"
            custom={2}
            className="mt-5"
          >
            <button 
              type="button"
              onClick={() => setShowEmailForm(!showEmailForm)}
              className="text-[13px] text-muted-foreground hover:text-foreground transition-colors font-medium cursor-pointer"
            >
              {showEmailForm ? "Log in with phone number instead" : "Log in with email instead"}
            </button>
          </motion.div>
        </div>
      </div>
    </div>
  );
}
