import { baseApi } from "../../api/baseApi";

const orderApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createOrder: builder.mutation({
      query: (userInfo) => ({
        url: "/order",
        method: "POST",
        body: userInfo,
      }),
    }),
    getOrders: builder.query({
      query: () => ({
        url:"/order",
        method:"GET",
      }),
    }),
    verifyOrder: builder.query({
      query: (order_id) => ({
        url: "/order/verify",
        params: { order_id },
        method: "GET",
      }),
    }),
    orderStatus: builder.mutation({
      query: ({id,status}) => ({
        url: `/order/${id}`,
        method: "PATCH",
        body:{status},
      }),
      invalidatesTags: ['User'], 
    }),
  }),
});

export const {
  useCreateOrderMutation,
  useGetOrdersQuery,
  useVerifyOrderQuery,
  useOrderStatusMutation
} = orderApi;
