// api/utils/analysingfunctions/modelUtils.js

import * as tf from '@tensorflow/tfjs';

// Create the model structure
export const createModel = () => {
  const model = tf.sequential();

  model.add(tf.layers.dense({ inputShape: [9], units: 16, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 32, activation: 'relu' }));
  model.add(tf.layers.dense({ units: 1 }));

  model.compile({
    optimizer: tf.train.adam(),
    loss: 'meanSquaredError',
    metrics: ['mse']
  });

  return model;
};

export const trainModel = async (model, trainingData, trainingLabels) => {
  const options = {
    epochs: 50,
    batchSize: 32,
    validationSplit: 0.2,
    shuffle: true,
  };

  return await model.fit(trainingData, trainingLabels, options);
};

export const preprocessData = (nitrogen, phosphorus, potassium, pH, soilType, cropType, location, growthStage, fertilizerType) => {
    return tf.tensor2d([[
      parseFloat(nitrogen) || 0,
      parseFloat(phosphorus) || 0,
      parseFloat(potassium) || 0,
      parseFloat(pH) || 0,
      parseInt(soilType) || 0,
      parseInt(cropType) || 0,
      parseInt(location) || 0,
      parseInt(growthStage) || 0,
      parseInt(fertilizerType) || 0
    ]]);
};
