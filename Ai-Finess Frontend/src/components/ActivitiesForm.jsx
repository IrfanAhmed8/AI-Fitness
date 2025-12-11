import React, { useState } from 'react'
import {
  Box,
  Card,
  CardContent,
  Typography,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Button
} from '@mui/material'
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter'
import { addActivity } from '../services/api'

function ActivitiesForm({ onActivityAdded }) {
  const [activity, setActivity] = useState({
    type: 'RUNNING',
    duration: '',
    caloriesBurned: '',
    additionMetrics: {}
  })

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await addActivity(activity)
      setActivity({
        type: 'RUNNING',
        duration: '',
        caloriesBurned: '',
        additionMetrics: {}
      })
      onActivityAdded?.()
    } catch (err) {
      console.error('Error adding activity:', err)
    }
  }

  return (
    <Box
      sx={{
        maxWidth: 420,
        mx: 'auto',
        mt: 4
      }}
    >
      <Card
        elevation={0}
        sx={{
          borderRadius: 4,
          backdropFilter: 'blur(10px)',
          background: 'linear-gradient(180deg, #0f2027, #203a43, #2c5364)',
          color: '#fff'
        }}
      >
        <CardContent sx={{ p: 4 }}>
          {/* Header */}
          <Box display="flex" alignItems="center" gap={1} mb={3}>
            <FitnessCenterIcon />
            <Typography variant="h6" fontWeight={600}>
              Log Today’s Activity
            </Typography>
          </Box>

          <form onSubmit={handleSubmit}>
            {/* Activity Type */}
            <FormControl fullWidth sx={{ mb: 2 }}>
              <InputLabel sx={{ color: '#ccc' }}>
                Activity Type
              </InputLabel>
              <Select
                value={activity.type}
                label="Activity Type"
                onChange={(e) =>
                  setActivity({ ...activity, type: e.target.value })
                }
                sx={{
                  color: '#fff',
                  '.MuiOutlinedInput-notchedOutline': {
                    borderColor: '#555'
                  }
                }}
              >
                <MenuItem value="RUNNING">Running</MenuItem>
                <MenuItem value="WALKING">Walking</MenuItem>
                <MenuItem value="CYCLING">Cycling</MenuItem>
              </Select>
            </FormControl>

            {/* Duration */}
            <TextField
              fullWidth
              label="Duration (minutes)"
              type="number"
              sx={{ mb: 2 }}
              value={activity.duration}
              onChange={(e) =>
                setActivity({ ...activity, duration: e.target.value })
              }
            />

            {/* Calories */}
            <TextField
              fullWidth
              label="Calories Burned"
              type="number"
              sx={{ mb: 3 }}
              value={activity.caloriesBurned}
              onChange={(e) =>
                setActivity({
                  ...activity,
                  caloriesBurned: e.target.value
                })
              }
            />

            {/* CTA */}
            <Button
              fullWidth
              type="submit"
              size="large"
              sx={{
                py: 1.4,
                borderRadius: 3,
                fontWeight: 600,
                background:
                  'linear-gradient(90deg, #00c6ff, #0072ff)',
                color: '#fff',
                '&:hover': {
                  opacity: 0.9
                }
              }}
            >
              Add Activity
            </Button>
          </form>
        </CardContent>
      </Card>
    </Box>
  )
}

export default ActivitiesForm
