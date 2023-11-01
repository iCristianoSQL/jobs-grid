import { AxiosResponse } from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "./api";
import { toast } from "react-toastify";

type TJobs = {
  id?: string;
  title: string;
  company: string;
  applicationDate?: Date;
  hasResponse: boolean;
  isClosed: boolean;
  recruiterLinkedIn: string;
  techLeadLinkedIn: string;
  jobDetailsURL: string;
};
type TJobsData = {
  data: TJobs[];
};
export const JobService = {
  useGetJobs: () => {
    return useQuery<TJobsData>("jobs", async () => {
      const response: AxiosResponse<TJobsData> = await api.get("job");
      return response.data;
    });
  },
  useDeleteJob: () => {
    const queryClient = useQueryClient();
    return useMutation((id: string) => api.delete(`job/?id=${id}`), {
      onSuccess: (data, variables, context) => {
        toast.error(data?.data.message);
      },
    });
  },
  usePostJob: () => {
    const queryClient = useQueryClient();
    return useMutation(
      (dados: TJobs) => {
        return api.post("job", dados);
      },
      {
        onSuccess: (data) => {
            toast.success(data.data.message)
          queryClient.invalidateQueries("jobs");
        },
      }
    );
  },
};
