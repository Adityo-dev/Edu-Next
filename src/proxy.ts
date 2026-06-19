import { jwtDecode } from 'jwt-decode';
import { NextRequest, NextResponse } from 'next/server';
import {
  ROLE_DASHBOARD_HOME,
  ROLE_DASHBOARD_PREFIX,
  roleTypes,
} from './components/dashboard/sidebar/sidebarRoutes';

const PROTECTED_PREFIX = '/dashboard';
const LOGIN_PATH = '/login';
const UNAUTHORIZED_PATH = '/';

export function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl;

  if (!pathname.startsWith(PROTECTED_PREFIX)) {
    return NextResponse.next();
  }

  const accessToken = request.cookies.get('accessToken')?.value;
  const userCookie = request.cookies.get('user')?.value;

  // 1 . User Not Login
  if (!accessToken || !userCookie) {
    const loginUrl = new URL(LOGIN_PATH, request.url);
    loginUrl.searchParams.set('redirect', pathname);
    return NextResponse.redirect(loginUrl);
  }

  // 2. Token expire Check
  try {
    const decoded: { exp: number } = jwtDecode(accessToken);
    if (decoded.exp * 1000 < Date.now()) {
      const loginUrl = new URL(LOGIN_PATH, request.url);
      loginUrl.searchParams.set('redirect', pathname);
      const response = NextResponse.redirect(loginUrl);
      response.cookies.delete('accessToken');
      response.cookies.delete('user');
      return response;
    }
  } catch {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  // 3. role Pass
  let role: roleTypes | undefined;
  try {
    role = JSON.parse(userCookie)?.role;
  } catch {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  if (!role || !ROLE_DASHBOARD_PREFIX[role]) {
    return NextResponse.redirect(new URL(LOGIN_PATH, request.url));
  }

  // 4. Going to /dashboard or /dashboard/{role} (root, no sub-page) will send you to your overview
  const ownPrefix = ROLE_DASHBOARD_PREFIX[role];
  if (pathname === PROTECTED_PREFIX || pathname === ownPrefix || pathname === `${ownPrefix}/`) {
    return NextResponse.redirect(new URL(ROLE_DASHBOARD_HOME[role], request.url));
  }

  // 5. Blocked from accessing dashboard of another role
  const isOwnDashboard = pathname.startsWith(ownPrefix);
  const isOtherRoleDashboard = Object.values(ROLE_DASHBOARD_PREFIX).some(
    (prefix) => pathname.startsWith(prefix) && prefix !== ownPrefix,
  );

  if (isOtherRoleDashboard && !isOwnDashboard) {
    return NextResponse.redirect(new URL(UNAUTHORIZED_PATH, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/dashboard/:path*'],
};
