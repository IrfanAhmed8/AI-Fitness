import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

import Grid from '@mui/material/Grid'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Chip from '@mui/material/Chip'

import DirectionsRunIcon from '@mui/icons-material/DirectionsRun'
import DirectionsWalkIcon from '@mui/icons-material/DirectionsWalk'
import DirectionsBikeIcon from '@mui/icons-material/DirectionsBike'
import LocalFireDepartmentIcon from '@mui/icons-material/LocalFireDepartment'
import TimerIcon from '@mui/icons-material/Timer'

import { getActivities } from '../services/api'

function ActivityList() {
  const [activities, setActivities] = useState([])
  const navigate = useNavigate()

  const fetchActivities = async () => {
    try {
      const response = await getActivities()
      setActivities(response.data)
    } catch (err) {
      console.error('Error fetching activities:', err)
    }
  }

  useEffect(() => {
    fetchActivities()
  }, [])

  const getIcon = (type) => {
    switch (type) {
      case 'RUNNING':
        return <DirectionsRunIcon />
      case 'WALKING':
        return <DirectionsWalkIcon />
      case 'CYCLING':
        return <DirectionsBikeIcon />
      default:
        return <DirectionsRunIcon />
    }
  }

  return (
    <Box sx={{ mt: 4 }}>
      <Typography variant="h6" fontWeight={700} mb={2}>
        Recent Activities
      </Typography>

      <Grid container spacing={2}>
        {activities.map((activity) => (
          <Grid item xs={12} sm={6} md={4} key={activity.id}>
            <Card
              onClick={() => navigate(`/activities/${activity.id}`)}
              sx={{
                cursor: 'pointer',
                borderRadius: 3,
                transition: '0.25s',
                background:
                  'linear-gradient(135deg, rgba(63,81,181,0.08), rgba(76,175,80,0.12))',
                '&:hover': {
                  transform: 'translateY(-4px)',
                  boxShadow: '0 12px 28px rgba(0,0,0,0.15)',
                },
              }}
            >
              <CardContent>
                {/* Header */}
                <Stack direction="row" alignItems="center" spacing={1.5}>
                  <Box
                    sx={{
                      width: 40,
                      height: 40,
                      borderRadius: '50%',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      bgcolor: 'background.paper',
                      boxShadow: 2,
                    }}
                  >
                    {getIcon(activity.type)}
                  </Box>

                  <Box>
                    <Typography fontWeight={700}>
                      {activity.type}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      Tap to view details
                    </Typography>
                  </Box>
                </Stack>

                {/* Stats */}
                <Stack direction="row" spacing={3} mt={3}>
                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={0.6} alignItems="center">
                      <TimerIcon fontSize="small" />
                      <Typography variant="caption" color="text.secondary">
                        Duration
                      </Typography>
                    </Stack>
                    <Typography fontWeight={600}>
                      {activity.duration} min
                    </Typography>
                  </Stack>

                  <Stack spacing={0.5}>
                    <Stack direction="row" spacing={0.6} alignItems="center">
                      <LocalFireDepartmentIcon
                        fontSize="small"
                        color="warning"
                      />
                      <Typography variant="caption" color="text.secondary">
                        Calories
                      </Typography>
                    </Stack>
                    <Typography fontWeight={600}>
                      {activity.caloriesBurned} kcal
                    </Typography>
                  </Stack>
                </Stack>

                {/* Status */}
                <Box mt={2}>
                  <Chip
                    label="Completed"
                    size="small"
                    sx={{
                      fontWeight: 600,
                      borderRadius: 999,
                      bgcolor: 'rgba(76,175,80,0.15)',
                    }}
                  />
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}

        {activities.length === 0 && (
          <Grid item xs={12}>
            <Box
              sx={{
                py: 5,
                textAlign: 'center',
                color: 'text.secondary',
              }}
            >
              <Typography>
                No activities yet. Start logging your workouts 💪
              </Typography>
            </Box>
          </Grid>
        )}
      </Grid>
    </Box>
  )
}

export default ActivityList
