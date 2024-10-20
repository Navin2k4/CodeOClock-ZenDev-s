import React from "react";
import { Grid, Card, CardContent, Typography, Divider } from "@mui/material";
import { useSelector } from "react-redux";

const FertilizerStatistics = ({ predictions }) => {
  const formData = useSelector((state) => state.form);
  const { location, soilType, cropType, growthStage } = formData;

  const avgYield =
    predictions.reduce((sum, entry) => sum + entry.yield, 0) /
    predictions.length;
  const maxYield = Math.max(...predictions.map((entry) => entry.yield));
  const minYield = Math.min(...predictions.map((entry) => entry.yield));

  return (
    <div style={{ padding: "30px" }}>
      <Typography
        variant="h4"
        gutterBottom
        style={{ marginBottom: "20px", fontWeight: "bold" }}
      >
        Fertilizer Prediction Dashboard
      </Typography>

      <Grid container spacing={3}>
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom >
                Average Predicted Yield
              </Typography>
              <Typography variant="h4" color="primary">
                {avgYield.toFixed(2)} kg/ha
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <Typography variant="h6" gutterBottom>
                Max Predicted Yield
              </Typography>
              <Typography variant="h4" color="secondary">
                {maxYield.toFixed(2)} kg/ha
              </Typography>
              <Divider style={{ margin: "10px 0" }} />
              <Typography variant="h6" gutterBottom>
                Min Predicted Yield
              </Typography>
              <Typography variant="h4" color="error">
                {minYield.toFixed(2)} kg/ha
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Location and Crop Info */}
        <Grid item xs={12} md={4}>
          <Card>
            <CardContent>
              <Typography variant="h6" gutterBottom >
                Location Information
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Location: </strong>
                <span className="capitalize">{location}</span>
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Soil Type: </strong>
                <span className="capitalize">{soilType}</span>
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Crop Type: </strong>
                <span className="capitalize">{cropType}</span>
              </Typography>
              <Typography variant="h6" gutterBottom>
                <strong>Growth Stage: </strong>
                <span className="capitalize">{growthStage}</span>
              </Typography>
            </CardContent>
          </Card>
        </Grid>

        {/* Key Insight */}
        <Grid item xs={12} md={4}>
          <Card >
            <CardContent>
              <Typography variant="h4" gutterBottom>
                Key Insights
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Based on the predictions, applying higher levels of nitrogen and
                maintaining an optimal pH (around 6.5) has the greatest
                potential to improve yield.
              </Typography>
              <Typography variant="h6" color="textSecondary">
                Keep phosphorus and potassium balanced to avoid diminishing
                returns.
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </div>
  );
};

export default FertilizerStatistics;
