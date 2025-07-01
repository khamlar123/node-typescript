export const cookie = (
    req: any,
    name: 'accessToken' | 'refreshToken'
): string | undefined => {
  // 1. Use correct header name "cookie"
  const cookieHeader: string = req.headers['cookies'] || '';

  // 2. Handle empty header case early
  if (!cookieHeader) return undefined;

  // 3. Proper parsing with error handling
  const cookies = cookieHeader.split(';').map(c => c.trim());
  const target = cookies.find(c => c.startsWith(`${name}=`));

  // 4. Explicit undefined return for missing/malformed cookies
  if (!target) return undefined;

  // 5. Handle empty cookie values
    return  target.split('=')[1] || undefined;
};