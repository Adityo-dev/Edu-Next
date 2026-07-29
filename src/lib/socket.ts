const SOCKET_URL =
  process.env.NEXT_PUBLIC_BASE_API?.replace('/api/v1', '') || 'https://edunext-apis.onrender.com';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let socket: any = null;

export const initSocket = async () => {
  if (typeof window === 'undefined') return null;

  if (!socket) {
    try {
      const { getValidToken } = await import('@/services/root/handleToken');
      const token = await getValidToken();

      const { io } = await import('socket.io-client');
      socket = io(SOCKET_URL, {
        transports: ['websocket'],
        autoConnect: true,
        auth: { token },
      });

      socket.on('connect', () => {
        console.log('Socket connected:', socket.id);
      });

      socket.on('disconnect', () => {
        console.log('Socket disconnected');
      });
    } catch (e) {
      console.error('Socket initialization failed', e);
    }
  }
  return socket;
};

export const getSocket = async () => {
  if (typeof window === 'undefined') return null;
  if (!socket) {
    return await initSocket();
  }
  return socket;
};
