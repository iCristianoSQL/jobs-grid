import { JobService } from "@/services/job";
import * as S from "./styles";
import Image from "next/image";
import { tableInfos } from "./content";
import { Spinner } from "../Spinner";
import { JobDrawer } from "../Drawers/JobDrawer";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { TJobs } from "@/utils/types";
import { AiFillMessage } from "react-icons/ai";

export const JobGrid = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [id, setId] = useState("");
  const [job, setJob] = useState<TJobs>({} as TJobs);
  const deleteJob = JobService.useDeleteJob();
  const { data: jobs, isLoading, refetch } = JobService.useGetJobs();
  const { usePatchJob } = JobService;
  const patchJob = usePatchJob();

  const handleDelete = async (id: string) => {
    try {
      await deleteJob.mutateAsync(id);
      refetch();
    } catch (error) {
      console.error("Erro ao excluir o job:", error);
    }
  };

  const jobDrawer = {
    handleCloseDrawer: () => {
      setDrawerOpen(false);
    },
    handleOpenDrawer: () => {
      setDrawerOpen(true);
    },
  };
  const jobStatistics = {
    feedbacks: jobs?.data.filter((element) => element.hasResponse === true),
    finished: jobs?.data.filter((element) => element.isClosed === true),
    techLeadSendedMessage: jobs?.data.filter((element) => element.sendedTechLeadMessage === true),
    recruiterSendedMessage: jobs?.data.filter((element) => element.sendedRecruiterMessage === true)
  };
  return (
    <S.Container>
      <S.NavBar>
        <button
          onClick={() => {
            setIsEditing(false);
            setJob({} as TJobs);
            jobDrawer.handleOpenDrawer();
          }}
        >
          Adicionar <AiOutlinePlus />
        </button>
        <S.Counters>
          Enviadas TR <b>{jobStatistics.recruiterSendedMessage?.length}</b>
        </S.Counters>
        <S.Counters>
          Enviadas TL <b>{jobStatistics.techLeadSendedMessage?.length}</b>
        </S.Counters>
        <S.Counters>
          Jobs <b>{jobs?.data.length}</b>
        </S.Counters>
        <S.Counters>
          Feedbacks <b>{jobStatistics.feedbacks?.length}</b>
        </S.Counters>
        <S.Counters>
          Finalizadas <b>{jobStatistics.finished?.length}</b>
        </S.Counters>
      </S.NavBar>
      <S.TableHeader>
        {tableInfos.map((element) => {
          return <S.TableInfos key={element.id}>{element.title}</S.TableInfos>;
        })}
      </S.TableHeader>
      {!!jobs?.data.length || isLoading ? (
        jobs?.data.map((element) => {
          const applicationDate = new Date(
            element.applicationDate ?? new Date()
          );
          const day = String(applicationDate.getDate()).padStart(2, "0");
          const month = String(applicationDate.getMonth() + 1).padStart(2, "0");
          const year = applicationDate.getFullYear();
          const formattedDate = `${day}/${month}/${year}`;

          const hasResponse = element.hasResponse ? "Sim" : "Não";
          const isClosed = element.isClosed ? "Sim" : "Não";
          return (
            <S.JobInfos key={element.id}>
              <S.Icons>
                <button onClick={() => handleDelete(element.id ?? "")}>
                  <Image
                    src="/delete-icon.png"
                    width={20}
                    height={20}
                    alt="Delete Job Icon"
                  />
                </button>
                <button
                  onClick={() => {
                    setIsEditing(true);
                    setId(element.id ?? "");
                    setJob(element);
                    jobDrawer.handleOpenDrawer();
                  }}
                >
                  <Image
                    src="/edit-icon.png"
                    width={20}
                    height={20}
                    alt="Edit Job Icon"
                  />
                </button>
              </S.Icons>
              <S.RowInfos>{element.company}</S.RowInfos>
              <S.RowInfos>{element.title}</S.RowInfos>
              <S.RowInfos>{formattedDate}</S.RowInfos>
              <S.RowInfos
                onClick={async () =>
                  await patchJob.mutateAsync({
                    ...element,
                    id: element.id,
                    hasResponse: !element.hasResponse,
                  })
                }
                className={`informacao-do-item ${
                  hasResponse === "Sim"
                    ? "obteve-resposta"
                    : "nao-obteve-resposta"
                }`}
              >
                {hasResponse}
              </S.RowInfos>
              <S.RowInfos
                onClick={async () =>
                  await patchJob.mutateAsync({
                    ...element,
                    id: element.id,
                    isClosed: !element.isClosed,
                  })
                }
                className={`informacao-do-item ${
                  isClosed === "Sim" ? "obteve-resposta" : "nao-obteve-resposta"
                }`}
              >
                {isClosed}
              </S.RowInfos>
              <S.RowInfos isSended={element.sendedRecruiterMessage}>
                <a
                  href={element.recruiterLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VER
                </a>
                <AiFillMessage
                  onClick={async () =>
                    await patchJob.mutateAsync({
                      ...element,
                      id: element.id,
                      sendedRecruiterMessage: !element.sendedRecruiterMessage,
                    })
                  }
                />
              </S.RowInfos>
              <S.RowInfos isSended={element.sendedTechLeadMessage}>
                <a
                  href={element.techLeadLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VER
                </a>
                <AiFillMessage
                  onClick={async () =>
                    await patchJob.mutateAsync({
                      ...element,
                      id: element.id,
                      sendedTechLeadMessage: !element.sendedTechLeadMessage,
                    })
                  }
                />
              </S.RowInfos>
              <S.RowInfos>
                <a
                  href={element.jobDetailsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VER
                </a>
              </S.RowInfos>
            </S.JobInfos>
          );
        })
      ) : (
        <div>Adicione</div>
      )}

      {isLoading && <Spinner />}
      <JobDrawer
        id={id}
        data={job}
        drawerOpen={drawerOpen}
        isEditing={isEditing}
        handleCloseDrawer={jobDrawer.handleCloseDrawer}
      />
    </S.Container>
  );
};
