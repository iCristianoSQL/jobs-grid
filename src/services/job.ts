import { AxiosResponse } from "axios";
import { useQuery, useMutation, useQueryClient } from "react-query";
import { api } from "./api";
import { toast } from "react-toastify";
import { TJobs, TJobsData } from "@/utils/types";

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
      (data: TJobs) => {
        return api.post("job", data);
      },
      {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries("jobs");
        },
      }
    );
  },
  usePutJob: () => {
    const queryClient = useQueryClient();
    return useMutation(
      (data: TJobs) => {
        return api.put("job", data);
      },
      {
        onSuccess: (data) => {
          toast.success(data.data.message);
          queryClient.invalidateQueries("jobs");
        },
      }
    );
  },
  usePatchJob: () => {
    const queryClient = useQueryClient();
    return useMutation(
      (data: TJobs) => {
        return api.patch("job", data);
      },
      {
        onSuccess: (data) => {
          queryClient.invalidateQueries("jobs");
        },
      }
    );
  },
};
