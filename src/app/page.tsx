"use client";
import { useEffect, useState } from "react";
import "./page.css";

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

export default function Home() {
  const [jobs, setJobs] = useState<TJobs>({} as TJobs);
  const [isLoading, setIsLoading] = useState(true);

  async function enviarDados() {
    try {
      const dados = {
        title: "Desenvolvedor Web",
        company: "Empresa XYZ",
        hasResponse: true,
        isClosed: false,
        recruiterLinkedIn: "https://www.linkedin.com/recruiter",
        techLeadLinkedIn: "https://www.linkedin.com/techlead",
        jobDetailsURL: "https://www.empresaxyz.com/vagas/detalhes",
      };

      await fetch("http://localhost:3000/api/hello", {
        method: "POST",
        body: JSON.stringify(dados),
      });
    } catch (error) {
      console.error("Erro na solicitação:", error);
    }
  }

  useEffect(() => {
    const getUsers = async () => {
      try {
        const response = await fetch("http://localhost:3000/api/hello");
        const data: TJobs = await response.json();
        setJobs(data);
      } catch (error) {
        console.error("Erro ao buscar os dados:", error);
      } finally {
        setIsLoading(false);
      }
    };
    getUsers();
  }, []);
  console.log(jobs);
  return (
    <main>
      <section>
        <button
          onClick={(e) => {
            e.preventDefault;
            enviarDados();
          }}
        >
          TESTEEEEEEEEEEE
        </button>
        <div className="linha-da-tabla">
          <div className="informacao-da-tabela">Empresa</div>
          <div className="informacao-da-tabela">Titulo</div>
          <div className="informacao-da-tabela">Data</div>
          <div className="informacao-da-tabela">Feedback</div>
          <div className="informacao-da-tabela">Finalizada</div>
          <div className="informacao-da-tabela">Recrutador</div>
          <div className="informacao-da-tabela">Tech Lead</div>
          <div className="informacao-da-tabela">Vaga</div>
        </div>
        {jobs?.data?.map((element) => {
          const dataAplicacao = new Date(element.applicationDate);
          const dia = String(dataAplicacao.getDate()).padStart(2, "0");
          const mes = String(dataAplicacao.getMonth() + 1).padStart(2, "0");
          const ano = dataAplicacao.getFullYear();
          const dataFormatada = `${dia}/${mes}/${ano}`;

          const obteveResposta = element.hasResponse ? "Sim" : "Não";
          const vagaEncerrada = element.isClosed ? "Sim" : "Não";
          return (
            <div className="empregos-informacoes">
              <div className="informacao-do-item">{element.company}</div>
              <div className="informacao-do-item">{element.title}</div>
              <div className="informacao-do-item">{dataFormatada}</div>
              <div
                className={`informacao-do-item ${
                  obteveResposta === "Sim"
                    ? "obteve-resposta"
                    : "nao-obteve-resposta"
                }`}
              >
                {obteveResposta}
              </div>
              <div
                className={`informacao-do-item ${
                  vagaEncerrada === "Sim"
                    ? "obteve-resposta"
                    : "nao-obteve-resposta"
                }`}
              >
                {vagaEncerrada}
              </div>
              <div className="informacao-do-item">
                <a
                  href={element.recruiterLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VER
                </a>
              </div>
              <div className="informacao-do-item">
                <a
                  href={element.techLeadLinkedIn}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VER
                </a>
              </div>
              <div className="informacao-do-item">
                <a
                  href={element.jobDetailsURL}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  VER
                </a>
              </div>
            </div>
          );
        })}
        {isLoading && <p>Carregando...</p>}
      </section>
    </main>
  );
}
