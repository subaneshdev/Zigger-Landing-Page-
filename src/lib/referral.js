/**
 * Generates a unique referral code from user's full name and mobile number.
 * Algorithm:
 * - Extract letters from first name/name prefix (up to 5 uppercase characters)
 * - Extract last 6 digits from phone number
 * Example: generateCodeFromMobile("Vijayrajkumar", "+918838814648") => "VIJAY14648"
 */
export function generateCodeFromMobile(fullName, mobileNumber) {
  if (!fullName && !mobileNumber) return '';

  const cleanName = (fullName || '')
    .replace(/[^a-zA-Z]/g, '')
    .toUpperCase()
    .slice(0, 5);

  const cleanMobile = (mobileNumber || '')
    .replace(/\D/g, '')
    .slice(-6);

  if (!cleanName && !cleanMobile) return '';
  return `${cleanName}${cleanMobile}`;
}

/**
 * Returns the shareable referral join URL for a given referral code.
 */
export function getReferralUrl(referralCode) {
  const code = referralCode || '';
  return `https://ziggers.in/join?ref=${encodeURIComponent(code)}`;
}

/**
 * Generates WhatsApp share URL with prefilled referral text.
 */
export function getWhatsAppShareUrl(referralCode) {
  const code = referralCode || '';
  const url = getReferralUrl(code);
  const text = `Join me on Ziggers! Use my partner code ${code} to get started and access verified daily gigs: ${url}`;
  return `https://wa.me/?text=${encodeURIComponent(text)}`;
}

/**
 * Generates customized WhatsApp group welcome template message.
 */
export function getGroupWelcomeMessage(referralCode) {
  const code = referralCode || 'YOUR_CODE';
  const url = getReferralUrl(code);

  return `🚨 EXCLUSIVE JOB OPPORTUNITIES FOR OUR COMMUNITY! 🚨

Hey everyone! We have officially partnered with Ziggers to bring verified, daily-wage gig jobs directly to our group!

Why work through Ziggers?
⚡ No Backouts for Employer – Guaranteed shift bookings
💰 Fair Price for Workers – Earn top daily wage rates
🚫 0% Commission – Keep 100% of what you earn
⚡ Instant UPI Payments – Get paid immediately post-gig
👻 No Ghosting – Verified employers & transparent check-ins

👉 Join Ziggers now using our official community partner link:
${url}

Use Official Community Code: ${code}

Get verified today & start receiving daily gig alerts! 💰🚀`;
}
