import React, { useEffect, useState } from 'react';
import {
  TextField,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Button,
  Grid,
  Typography,
  Container,
} from '@mui/material';

const Form = ({ onSubmit, initialData }) => {
    console.log(initialData);
    
  // Initialize the state with initialData if provided
  const [formData, setFormData] = useState({
    location: '',
    cropType: '',
    soilType: '',
    growthStage: '',
    nitrogen: '',
    phosphorus: '',
    potassium: '',
    pH: '',
    fertilizerType: ''
  });

  // Effect to set the form data if initialData is provided
  useEffect(() => {
    if (initialData) {
      setFormData(initialData);
    }
  }, [initialData]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(formData);
  };

  return (
    <Container>
      <Typography variant="h5" gutterBottom>
        Fertilizer Yield Prediction Form
      </Typography>
      <form onSubmit={handleSubmit}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Location</InputLabel>
              <Select name="location" value={formData.location} onChange={handleChange}>
                <MenuItem value="madurai">Madurai</MenuItem>
                <MenuItem value="chennai">Chennai</MenuItem>
                {/* Add other locations */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Crop Type</InputLabel>
              <Select name="cropType" value={formData.cropType} onChange={handleChange}>
                <MenuItem value="wheat">Wheat</MenuItem>
                <MenuItem value="rice">Rice</MenuItem>
                {/* Add other crops */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Soil Type</InputLabel>
              <Select name="soilType" value={formData.soilType} onChange={handleChange}>
                <MenuItem value="clay">Clay</MenuItem>
                <MenuItem value="sandy">Sandy</MenuItem>
                {/* Add other soil types */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <FormControl fullWidth>
              <InputLabel>Growth Stage</InputLabel>
              <Select name="growthStage" value={formData.growthStage} onChange={handleChange}>
                <MenuItem value="germination">Germination</MenuItem>
                <MenuItem value="vegetative">Vegetative</MenuItem>
                {/* Add other growth stages */}
              </Select>
            </FormControl>
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Nitrogen (N)"
              type="number"
              name="nitrogen"
              value={formData.nitrogen}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Phosphorus (P)"
              type="number"
              name="phosphorus"
              value={formData.phosphorus}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="Potassium (K)"
              type="number"
              name="potassium"
              value={formData.potassium}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12} sm={6}>
            <TextField
              label="pH"
              type="number"
              name="pH"
              value={formData.pH}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <TextField
              label="Fertilizer Type"
              name="fertilizerType"
              value={formData.fertilizerType}
              onChange={handleChange}
              fullWidth
            />
          </Grid>

          <Grid item xs={12}>
            <Button type="submit" variant="contained" color="primary">
              Predict Yield
            </Button>
          </Grid>
        </Grid>
      </form>
    </Container>
  );
};

export default Form;
    