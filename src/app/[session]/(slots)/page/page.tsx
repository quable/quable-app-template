"use client";

import { addKeyValue } from "@/lib/actions/key-value";
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import { TextField, Button } from "@quable/ui";
import { useMutation } from "@tanstack/react-query";
import { useTranslations } from "next-intl";
import { useForm, SubmitHandler } from "react-hook-form";
import { toast } from "react-toastify";

export default function HomePage() {
  const t = useTranslations();
  const { register, formState, handleSubmit, reset } = useForm<{
    key: string;
    value: string;
  }>({
    defaultValues: {
      key: "",
      value: "",
    },
    mode: "onChange",
  });

  const { isPending, mutateAsync } = useMutation({
    mutationFn: (data: { key: string; value: string }) =>
      addKeyValue(data.key, data.value),
    onSuccess: (data) => {
      if (data.keyValue) {
        toast.success(t("toasts.add_key_value_success"));
        reset();
      } else {
        toast.error(data.error);
      }
    },
    onError: () => {
      toast.error(t("toasts.add_key_value_error"));
    },
  });

  const onSubmit: SubmitHandler<{ key: string; value: string }> = (data) => {
    console.log("submitting data", data);
    mutateAsync(data);
  };

  return (
    <div className="page-layout">
      <Typography variant="h4">{t("common.app_name")}</Typography>

      <div className="content-wrapper">
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Card>
            <CardHeader title={t("configuration.add_key_value")} />
            <CardContent>
              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    disabled={isPending}
                    label={t("configuration.key")}
                    fullWidth={true}
                    margin="normal"
                    error={!!formState.errors.key}
                    helperText={formState.errors.key?.message}
                    {...register("key", {
                      required: {
                        value: true,
                        message: t("common.key_required"),
                      },
                    })}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    disabled={isPending}
                    label={t("configuration.value")}
                    fullWidth={true}
                    error={!!formState.errors.value}
                    helperText={formState.errors.value?.message}
                    margin="normal"
                    {...register("value", {
                      required: {
                        value: true,
                        message: t("common.value_required"),
                      },
                    })}
                  />
                </Grid>
              </Grid>
            </CardContent>
            <CardActions sx={{ justifyContent: "flex-end", padding: 2 }}>
              <Button
                isLoading={isPending}
                disabled={isPending}
                variant="contained"
                type="submit"
                color="primary"
              >
                {" "}
                {t("common.save")}
              </Button>
            </CardActions>
          </Card>
        </form>
      </div>
    </div>
  );
}
