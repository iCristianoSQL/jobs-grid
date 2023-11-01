import { AxiosResponse } from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "./api";

type TJobs = {
  data: {
    id: string;
    title: string;
    company: string;
    applicationDate: Date;
    hasResponse: boolean;
    isClosed: boolean;
    recruiterLinkedIn: string;
    techLeadLinkedIn: string;
    jobDetailsURL: string;
  }[];
};

export const JobService = {
  useGetJobs: () => {
    return useQuery<TJobs>("jobs", async () => {
      const response: AxiosResponse<TJobs> = await api.get("job");
      return response.data;
    });
  },
  useDeleteJob: () => {
    const queryClient = useQueryClient();
    return useMutation((id: string) => api.delete(`job/?id=${id}`), {
      onSuccess: (data, variables, context) => {
        console.log("Resposta da requisição:", data?.data.message);
      },
    });
  },
};
