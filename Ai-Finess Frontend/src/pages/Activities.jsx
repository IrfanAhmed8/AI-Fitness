import { useState, useEffect } from "react";
import ActivityList from "../components/ActivityList";
import ActivitiesForm from "../components/activitiesForm";

import {
  Box,
  Container,
  Typography,
  Paper,
  Button,
  Stack,
  Collapse,
  Divider,
} from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import CloseIcon from "@mui/icons-material/Close";

function Activities() {
  const [showForm, setShowForm] = useState(false);
  const [reloadActivities, setReloadActivities] = useState(false);

  const handleReloadActivities = () => {
    setReloadActivities((prev) => !prev);
  };

  const handleToggleForm = () => {
    setShowForm((prev) => !prev);
  };

  useEffect(() => {
    console.log("Form visible:", showForm);
  }, [showForm]);

  return (
    <Box
      sx={{
        minHeight: "100vh",
        background:
          "radial-gradient(circle at top left, #1fe4a8 0, #0b1120 45%, #020617 100%)",
        display: "flex",
        alignItems: "flex-start",
        justifyContent: "center",
        py: 6,
        px: 2,
      }}
    >
      <Container maxWidth="md">
        {/* Main card */}
        <Paper
          elevation={6}
          sx={{
            borderRadius: 4,
            p: { xs: 3, md: 4 },
            bgcolor: "rgba(15,23,42,0.95)",
            border: "1px solid rgba(148, 163, 184, 0.35)",
            backdropFilter: "blur(18px)",
          }}
        >
          {/* Header */}
          <Stack
            direction={{ xs: "column", sm: "row" }}
            spacing={2}
            alignItems={{ xs: "flex-start", sm: "center" }}
            justifyContent="space-between"
            sx={{ mb: 3 }}
          >
            <Box>
              <Typography
                variant="h4"
                sx={{
                  fontWeight: 700,
                  letterSpacing: 0.5,
                  color: "white",
                }}
              >
                Daily Activities
              </Typography>
              <Typography
                variant="body2"
                sx={{
                  mt: 0.5,
                  color: "rgba(148,163,184,0.9)",
                }}
              >
                Log your workout and keep track of your progress.
              </Typography>
            </Box>

            <Button
              onClick={handleToggleForm}
              variant="contained"
              startIcon={showForm ? <CloseIcon /> : <AddCircleOutlineIcon />}
              sx={{
                borderRadius: 999,
                px: 3,
                py: 1,
                textTransform: "none",
                fontWeight: 600,
                fontSize: 14,
                boxShadow:
                  "0 10px 25px rgba(34,197,94,0.35), 0 0 0 1px rgba(34,197,94,0.4)",
                background:
                  "linear-gradient(135deg, #22c55e 0%, #4ade80 40%, #22c55e 100%)",
                "&:hover": {
                  background:
                    "linear-gradient(135deg, #16a34a 0%, #22c55e 50%, #16a34a 100%)",
                  boxShadow:
                    "0 14px 30px rgba(34,197,94,0.5), 0 0 0 1px rgba(34,197,94,0.7)",
                },
              }}
            >
              {showForm ? "Close Activity Form" : "Add Activity"}
            </Button>
          </Stack>

          {/* Form section */}
          <Collapse in={showForm} unmountOnExit>
            <Box
              sx={{
                mb: 3,
                p: 2.5,
                borderRadius: 3,
                bgcolor: "rgba(15,23,42,0.8)",
                border: "1px solid rgba(55,65,81,0.8)",
              }}
            >
              <Typography
                variant="subtitle1"
                sx={{ mb: 2, fontWeight: 600, color: "white" }}
              >
                Log a new activity
              </Typography>
              <ActivitiesForm onActivityAdded={handleReloadActivities} />
            </Box>
          </Collapse>

          <Divider
            sx={{
              mb: 3,
              borderColor: "rgba(51,65,85,0.9)",
            }}
          />

          {/* List section */}
          <Box>
            <Typography
              variant="subtitle1"
              sx={{
                mb: 1.5,
                fontWeight: 600,
                color: "rgba(248,250,252,0.95)",
              }}
            >
              Activity history
            </Typography>
            <Typography
              variant="body2"
              sx={{
                mb: 2.5,
                color: "rgba(148,163,184,0.9)",
              }}
            >
              Tap an activity card to view detailed stats.
            </Typography>

            <ActivityList key={reloadActivities} />
          </Box>
        </Paper>
      </Container>
    </Box>
  );
}

export default Activities;
