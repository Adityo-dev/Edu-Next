import { apiClient } from '@/redux/apiClient/apiClient';

export interface TicketMessage {
  _id: string;
  sender?: string;
  senderId?: {
    _id: string;
    email: string;
    role: string;
    avatar?: string;
    fullName?: string;
  };
  message?: string;
  text?: string;
  createdAt: string;
}

export interface Ticket {
  _id: string;
  title: string;
  category: string;
  targetRole: string;
  priority: string;
  status: 'open' | 'resolved' | 'closed';
  courseId?: string;
  assignedTo?: string;
  senderId?: {
    _id: string;
    email: string;
    fullName?: string;
    avatar?: string;
    role: string;
  };
  messages?: TicketMessage[];
  createdAt: string;
  updatedAt: string;
}

interface TicketsResponse {
  success: boolean;
  tickets: Ticket[];
}

interface SingleTicketResponse {
  success: boolean;
  ticket: Ticket;
  messages: TicketMessage[];
}

export const ticketsApi = apiClient.injectEndpoints({
  endpoints: (builder) => ({
    getTickets: builder.query<TicketsResponse, void>({
      query: () => '/tickets',
      providesTags: ['Tickets'],
    }),

    getTicketDetails: builder.query<SingleTicketResponse, string>({
      query: (id) => `/tickets/${id}`,
      providesTags: (result, error, id) => [{ type: 'Tickets', id }],
    }),

    createTicket: builder.mutation<
      SingleTicketResponse,
      {
        title: string;
        category: string;
        targetRole: string;
        priority: string;
        assignedTo?: string;
        courseId?: string;
        message: string;
      }
    >({
      query: (body) => ({
        url: '/tickets',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Tickets'],
    }),

    replyToTicket: builder.mutation<unknown, { id: string; message: string }>({
      query: ({ id, message }) => ({
        url: `/tickets/${id}/messages`,
        method: 'POST',
        body: { message, text: message },
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'Tickets', id }],
    }),

    updateTicketStatus: builder.mutation<
      unknown,
      { id: string; status: 'open' | 'resolved' | 'closed' }
    >({
      query: ({ id, status }) => ({
        url: `/tickets/${id}/status`,
        method: 'PATCH',
        body: { status },
      }),
    }),
  }),
});

export const {
  useGetTicketsQuery,
  useGetTicketDetailsQuery,
  useCreateTicketMutation,
  useReplyToTicketMutation,
  useUpdateTicketStatusMutation,
} = ticketsApi;
