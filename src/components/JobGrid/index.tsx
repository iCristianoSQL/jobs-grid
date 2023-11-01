import { JobService } from "@/services/job";
import * as S from "./styles";
import Image from "next/image";
import { tableInfos } from "./content";
import { Spinner } from "../Spinner";
import { JobDrawer } from "../Drawers/JobDrawer";
import { useState } from "react";
import { AiOutlinePlus } from "react-icons/ai";

export const JobGrid = () => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const deleteJob = JobService.useDeleteJob();
  const { data: jobs, isLoading, refetch } = JobService.useGetJobs();

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
  return (
    <S.Container>
      <S.NavBar>
        <button onClick={() => jobDrawer.handleOpenDrawer()}>
          Adicionar <AiOutlinePlus />
        </button>
      </S.NavBar>
      <S.TableHeader>
        {tableInfos.map((element) => {
          return <S.TableInfos key={element.id}>{element.title}</S.TableInfos>;
        })}
      </S.TableHeader>
      {jobs?.data?.map((element) => {
        const applicationDate = new Date(element.applicationDate ?? new Date());
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
              <button onClick={() => jobDrawer.handleOpenDrawer()}>
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
              className={`informacao-do-item ${
                hasResponse === "Sim"
                  ? "obteve-resposta"
                  : "nao-obteve-resposta"
              }`}
            >
              {hasResponse}
            </S.RowInfos>
            <S.RowInfos
              className={`informacao-do-item ${
                isClosed === "Sim" ? "obteve-resposta" : "nao-obteve-resposta"
              }`}
            >
              {isClosed}
            </S.RowInfos>
            <S.RowInfos>
              <a
                href={element.recruiterLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                VER
              </a>
            </S.RowInfos>
            <S.RowInfos>
              <a
                href={element.techLeadLinkedIn}
                target="_blank"
                rel="noopener noreferrer"
              >
                VER
              </a>
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
      })}
      {isLoading && <Spinner />}
      <JobDrawer
        drawerOpen={drawerOpen}
        handleCloseDrawer={jobDrawer.handleCloseDrawer}
      />
    </S.Container>
  );
};
