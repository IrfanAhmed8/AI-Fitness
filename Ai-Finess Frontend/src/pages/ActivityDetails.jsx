import React, { useState, useEffect } from 'react';
import {
  Box,
  Card,
  CardContent,
  Divider,
  Typography,
  Grid,
  Stack,
  Chip,
  IconButton,
  CircularProgress,
} from '@mui/material';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { useParams, useNavigate } from 'react-router-dom';
import { getActivityDetails } from '../services/api';

function ActivityDetails() {
  const [activity, setActivity] = useState(null);
  const [recommendations, setRecommendations] = useState(null);
  const [loading, setLoading] = useState(true);

  const { activityId } = useParams();
  const navigate = useNavigate();

  const fetchActivityDetails = async () => {
    try {
      const response = await getActivityDetails(activityId);
      setActivity(response.data);
      setRecommendations(response.data.recommendation || []);
      console.log('Activity details:', response.data);
    } catch (err) {
      console.error('Error fetching activity details:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (activityId) {
      fetchActivityDetails();
    }
  }, [activityId]);

  if (loading) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#020617',
        }}
      >
        <Stack spacing={2} alignItems="center">
          <CircularProgress />
          <Typography color="grey.300">Loading your workout...</Typography>
        </Stack>
      </Box>
    );
  }

  if (!activity) {
    return (
      <Box
        sx={{
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          bgcolor: '#020617',
          px: 2,
        }}
      >
        <Card
          sx={{
            maxWidth: 480,
            width: '100%',
            bgcolor: 'rgba(15,23,42,0.95)',
            borderRadius: 4,
            border: '1px solid #22c55e33',
          }}
        >
          <CardContent sx={{ textAlign: 'center', py: 4 }}>
            <Typography variant="h6" color="grey.100" gutterBottom>
              Activity not found
            </Typography>
            <Typography color="grey.400">
              We couldn&apos;t find this session. It might have been removed or never existed.
            </Typography>
          </CardContent>
        </Card>
      </Box>
    );
  }

  const formattedDate = activity.createdAt
    ? new Date(activity.createdAt).toLocaleString()
    : 'N/A';

  return (
    <Box
      sx={{
        minHeight: '100vh',
        bgcolor: '#020617',
        py: 4,
        px: { xs: 2, sm: 3 },
        backgroundImage: `
          radial-gradient(circle at top, #22c55e1a 0, transparent 55%),
          radial-gradient(circle at bottom, #22c55e0f 0, transparent 50%)
        `,
      }}
    >
      <Box sx={{ maxWidth: 1200, mx: 'auto' }}>
        {/* Top bar */}
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={3}>
          <Stack direction="row" spacing={1.5} alignItems="center">
            <IconButton
              onClick={() => navigate(-1)}
              sx={{
                bgcolor: 'rgba(15,23,42,0.9)',
                borderRadius: 2,
                border: '1px solid rgba(148,163,184,0.35)',
                '&:hover': {
                  bgcolor: 'rgba(15,23,42,1)',
                  borderColor: '#22c55e80',
                },
              }}
            >
              <ArrowBackIcon fontSize="small" />
            </IconButton>
            <Box>
              <Typography variant="h5" color="grey.50" fontWeight={600}>
                Activity Summary
              </Typography>
              <Typography variant="body2" color="grey.400">
                Detailed breakdown of your AI-analyzed workout
              </Typography>
            </Box>
          </Stack>

          <Chip
            label={formattedDate}
            size="small"
            sx={{
              bgcolor: 'rgba(15,23,42,0.95)',
              color: 'grey.200',
              borderRadius: 999,
              border: '1px solid rgba(148,163,184,0.4)',
              maxWidth: 240,
            }}
          />
        </Stack>

        {/* MAIN GRID – both columns same width */}
        <Grid container spacing={3}>
          {/* Left: Workout / core stats */}
          <Grid item xs={12} md={6}>
            <Card
              sx={{
                height: '100%',
                bgcolor: 'rgba(15,23,42,0.95)',
                borderRadius: 4,
                p: 2,
                border: '1px solid rgba(148,163,184,0.35)',
                boxShadow: '0 24px 60px rgba(0,0,0,0.8)',
                backdropFilter: 'blur(16px)',
              }}
            >
              <CardContent>
                <Stack spacing={2}>
                  <Stack direction="row" justifyContent="space-between" alignItems="center">
                    <Typography
                      variant="overline"
                      sx={{ letterSpacing: 1.5, color: '#22c55e' }}
                    >
                      WORKOUT
                    </Typography>
                    <Chip
                      label="Tracked by AI"
                      size="small"
                      sx={{
                        bgcolor: '#22c55e1f',
                        color: '#bbf7d0',
                        borderRadius: 999,
                        border: '1px solid #22c55e55',
                      }}
                    />
                  </Stack>

                  <Typography variant="h4" fontWeight={700} color="grey.50">
                    {activity.type}
                  </Typography>

                  <Stack direction="row" spacing={1} flexWrap="wrap">
                    <Chip
                      icon={<FitnessCenterIcon />}
                      label="Workout Session"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(15,23,42,0.9)',
                        color: 'grey.200',
                        borderRadius: 999,
                        border: '1px solid rgba(148,163,184,0.5)',
                      }}
                    />
                    <Chip
                      label="Daily Log"
                      size="small"
                      sx={{
                        bgcolor: 'rgba(31,41,55,0.9)',
                        color: 'grey.200',
                        borderRadius: 999,
                      }}
                    />
                  </Stack>

                  <Divider sx={{ borderColor: 'rgba(51,65,85,0.8)', my: 1 }} />

                  <Grid container spacing={2}>
                    <Grid item xs={6}>
                      <Stack
                        spacing={0.5}
                        sx={{
                          p: 1.5,
                          borderRadius: 3,
                          bgcolor: 'rgba(15,23,42,0.9)',
                          border: '1px solid rgba(51,65,85,0.9)',
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <AccessTimeIcon fontSize="small" />
                          <Typography variant="caption" color="grey.400">
                            Duration
                          </Typography>
                        </Stack>
                        <Typography variant="h5" color="grey.50" fontWeight={600}>
                          {activity.duration || 0}
                        </Typography>
                        <Typography variant="caption" color="grey.500">
                          minutes
                        </Typography>
                      </Stack>
                    </Grid>

                    <Grid item xs={6}>
                      <Stack
                        spacing={0.5}
                        sx={{
                          p: 1.5,
                          borderRadius: 3,
                          bgcolor: '#22c55e1f',
                          border: '1px solid #22c55e55',
                        }}
                      >
                        <Stack direction="row" alignItems="center" spacing={1}>
                          <LocalFireDepartmentIcon fontSize="small" />
                          <Typography variant="caption" color="#bbf7d0">
                            Calories
                          </Typography>
                        </Stack>
                        <Typography variant="h5" color="#bbf7d0" fontWeight={600}>
                          {activity.caloriesBurned || 0}
                        </Typography>
                        <Typography variant="caption" color="#bbf7d0">
                          kcal burned
                        </Typography>
                      </Stack>
                    </Grid>
                  </Grid>

                  <Box
                    sx={{
                      mt: 1.5,
                      p: 1.5,
                      borderRadius: 3,
                      bgcolor: 'rgba(15,23,42,0.9)',
                      border: '1px dashed rgba(51,65,85,0.8)',
                    }}
                  >
                    <Typography variant="caption" color="grey.400">
                      Session ID
                    </Typography>
                    <Typography variant="body2" color="grey.200">
                      #{activityId}
                    </Typography>
                  </Box>
                </Stack>
              </CardContent>
            </Card>
          </Grid>

          {/* Right: AI recommendations – SAME WIDTH as workout */}
          <Grid item xs={12} md={6}>
            {recommendations && (
              <Card
                sx={{
                  height: '100%',
                  bgcolor: 'rgba(15,23,42,0.97)',
                  borderRadius: 4,
                  border: '1px solid #22c55e33',
                  boxShadow: '0 24px 60px rgba(0,0,0,0.9)',
                  backdropFilter: 'blur(18px)',
                }}
              >
                <CardContent sx={{ p: { xs: 2.5, sm: 3 } }}>
                  <Stack
                    direction="row"
                    alignItems="center"
                    justifyContent="space-between"
                    mb={1.5}
                  >
                    <Box>
                      <Typography
                        variant="overline"
                        sx={{ color: '#22c55e', letterSpacing: 2 }}
                      >
                        AI COACH
                      </Typography>
                      <Typography variant="h5" color="grey.50" fontWeight={600}>
                        Recommendations & Safety
                      </Typography>
                    </Box>
                    <Chip
                      label="Personalized"
                      size="small"
                      sx={{
                        bgcolor: '#22c55e1f',
                        color: '#bbf7d0',
                        borderRadius: 999,
                        border: '1px solid #22c55e55',
                      }}
                    />
                  </Stack>

                  <Divider sx={{ borderColor: 'rgba(51,65,85,0.8)', mb: 2 }} />

                  {/* Analysis */}
                  <Typography variant="subtitle1" color="grey.100" gutterBottom>
                    Analysis
                  </Typography>
                  <Typography paragraph color="grey.300">
                    {activity.recommendation || 'No analysis available.'}
                  </Typography>

                  <Divider sx={{ borderColor: 'rgba(51,65,85,0.8)', my: 2 }} />

                  {/* Improvements */}
                  <Typography variant="subtitle1" color="grey.100" gutterBottom>
                    Improvements
                  </Typography>
                  {activity?.improvements?.length ? (
                    activity.improvements.map((improvement, index) => (
                      <Typography key={index} paragraph color="grey.300">
                        • {improvement}
                      </Typography>
                    ))
                  ) : (
                    <Typography paragraph color="grey.500">
                      No improvements listed.
                    </Typography>
                  )}

                  <Divider sx={{ borderColor: 'rgba(51,65,85,0.8)', my: 2 }} />

                  {/* Suggestions */}
                  <Typography variant="subtitle1" color="grey.100" gutterBottom>
                    Suggestions
                  </Typography>
                  {activity?.suggestions?.length ? (
                    activity.suggestions.map((suggestion, index) => (
                      <Typography key={index} paragraph color="grey.300">
                        • {suggestion}
                      </Typography>
                    ))
                  ) : (
                    <Typography paragraph color="grey.500">
                      No suggestions listed.
                    </Typography>
                  )}

                  <Divider sx={{ borderColor: 'rgba(51,65,85,0.8)', my: 2 }} />

                  {/* Safety */}
                  <Typography variant="subtitle1" color="grey.100" gutterBottom>
                    Safety Guidelines
                  </Typography>
                  {activity?.safety?.length ? (
                    activity.safety.map((s, index) => (
                      <Typography key={index} paragraph color="grey.300">
                        • {s}
                      </Typography>
                    ))
                  ) : (
                    <Typography paragraph color="grey.500">
                      No safety guidelines listed.
                    </Typography>
                  )}
                </CardContent>
              </Card>
            )}
          </Grid>
        </Grid>
      </Box>
    </Box>
  );
}

export default ActivityDetails;
