import { Typography, Stack } from "@mui/material";
import { getCurrentSession } from "@/lib/session";

export default async function SessionDetails() {
  const session = await getCurrentSession();

  if (!session) {
    return <Typography variant="body1">No active session</Typography>;
  }

  return (
    <Stack spacing={1.5}>
      <Field label="Session ID" value={session.id} />
      <Field label="User ID" value={session.userId} />
      <Field label="Data locale" value={session.dataLocale} />
      <Field label="Interface locale" value={session.interfaceLocale} />
      <Field label="Quable instance" value={session.quableInstance.name} />
      <Field
        label="Document IDs"
        value={
          session.documentIds
            ? JSON.stringify(session.documentIds, null, 2)
            : "—"
        }
        mono
      />
      <Field label="Created at" value={formatDate(session.createdAt)} />
      <Field label="Updated at" value={formatDate(session.updatedAt)} />
    </Stack>
  );
}

function Field({
  label,
  value,
  mono = false,
}: {
  label: string;
  value: React.ReactNode;
  mono?: boolean;
}) {
  return (
    <Stack direction="row" spacing={1}>
      <Typography variant="body2" color="text.secondary" sx={{ minWidth: 180 }}>
        {label}
      </Typography>
      <Typography
        variant="body2"
        sx={
          mono ? { fontFamily: "monospace", whiteSpace: "pre-wrap" } : undefined
        }
      >
        {value}
      </Typography>
    </Stack>
  );
}

function formatDate(date: Date) {
  return date.toLocaleString();
}
