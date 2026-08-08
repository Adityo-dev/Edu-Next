const SOCKET_URL =
  process.env.NEXT_PUBLIC_BASE_API?.replace('/api/v1', '') || 'https://edunext-apis.onrender.com';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
let socket: any = null;
// eslint-disable-next-line @typescript-eslint/no-explicit-any
let socketPromise: Promise<any> | null = null;

export const initSocket = async () => {
  if (typeof window === 'undefined') return null;

  if (socket) return socket;

  if (!socketPromise) {
    socketPromise = (async () => {
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
          // Socket connected successfully
        });

        socket.on('disconnect', () => {
          // Socket disconnected
        });

        return socket;
      } catch (e) {
        console.error('Socket initialization failed', e);
        socketPromise = null;
        return null;
      }
    })();
  }

  return socketPromise;
};

export const getSocket = async () => {
  if (typeof window === 'undefined') return null;
  return await initSocket();
};
