import { Drawer, TextField, Button, Switch, colors } from "@mui/material";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { TDrawer } from "../types";
import { Form, InputBox } from "./styles";
import { url } from "@/utils/url";
import { JobService } from "@/services/job";
import { toast } from "react-toastify";

const schema = z.object({
  company: z.string(),
  title: z.string(),
  recruiterLinkedIn: z.string(),
  techLeadLinkedIn: z.string(),
  jobDetailsURL: z.string(),
  hasResponse: z.boolean(),
  isClosed: z.boolean(),
});

type FormData = z.infer<typeof schema>;
export const JobDrawer = ({ drawerOpen, handleCloseDrawer }: TDrawer) => {
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<FormData>({
    defaultValues: {
      hasResponse: false,
      isClosed: false,
    },
  });

  const { usePostJob } = JobService;
  const enviarDadosMutation = usePostJob();

  const onSubmit = async (data: FormData) => {
    try {
      const response = await enviarDadosMutation.mutateAsync(data);
      reset();
      handleCloseDrawer();
    } catch (error) {
      toast.error("Erro ao enviar dados:");
    }
  };

  return (
    <Drawer anchor="right" open={drawerOpen} onClose={handleCloseDrawer}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <h3>Novo Job</h3>
        <InputBox>
          <Controller
            name="company"
            control={control}
            render={({ field }) => (
              <TextField
                label="Empresa"
                fullWidth
                variant="outlined"
                {...field}
                error={!!errors.company}
                helperText={errors.company?.message}
              />
            )}
          />
          <Controller
            name="title"
            control={control}
            render={({ field }) => (
              <TextField
                label="Titulo"
                fullWidth
                variant="outlined"
                {...field}
                error={!!errors.title}
                helperText={errors.title?.message}
              />
            )}
          />
        </InputBox>
        <InputBox>
          <Controller
            name="recruiterLinkedIn"
            control={control}
            render={({ field }) => (
              <TextField
                label="Linkedin do recrutador"
                fullWidth
                variant="outlined"
                {...field}
                error={!!errors.recruiterLinkedIn}
                helperText={errors.recruiterLinkedIn?.message}
              />
            )}
          />
          <Controller
            name="techLeadLinkedIn"
            control={control}
            render={({ field }) => (
              <TextField
                label="Linkedin do Tech Lead"
                fullWidth
                variant="outlined"
                {...field}
                error={!!errors.techLeadLinkedIn}
                helperText={errors.techLeadLinkedIn?.message}
              />
            )}
          />
        </InputBox>
        <Controller
          name="jobDetailsURL"
          control={control}
          render={({ field }) => (
            <TextField
              label="Link da vaga"
              fullWidth
              variant="outlined"
              {...field}
              error={!!errors.jobDetailsURL}
              helperText={errors.jobDetailsURL?.message}
            />
          )}
        />
        <InputBox>
          <Controller
            name="hasResponse"
            control={control}
            render={({ field }) => (
              <div>
                <label>Feedback</label>
                <Switch
                  {...field}
                  checked={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
          <Controller
            name="isClosed"
            control={control}
            render={({ field }) => (
              <div>
                <label>Resposta do Recrutador</label>
                <Switch
                  {...field}
                  checked={field.value}
                  onChange={field.onChange}
                />
              </div>
            )}
          />
        </InputBox>
        <Button
          type="submit"
          sx={{
            backgroundColor: "white",
            color: "black",
            width: "100px",
            alignSelf: "center",
          }}
        >
          Enviar
        </Button>
      </Form>
    </Drawer>
  );
};
