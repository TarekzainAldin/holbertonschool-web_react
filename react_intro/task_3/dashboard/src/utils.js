export function getCurrentYear() {
  return new Date().getFullYear();
}

export function getFooterCopy(isIndex) {
  return isIndex ? "holberton School" : "Holberton School main dashboard";
}

export function getLatestNotification() {
  return "<strong>Urgent requirement</strong> - complete by EOD";
}
