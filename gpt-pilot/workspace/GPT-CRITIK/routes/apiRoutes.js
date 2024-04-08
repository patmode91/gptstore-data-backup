const express = require('express');
const axios = require('axios');
const router = express.Router();

router.post('/api/reviews/generate', async (req, res) => {
  const { modelId } = req.body; // Assuming modelId is passed in the request body

  if (!modelId) {
    console.log('Model ID is required but was not provided');
    return res.status(400).send('Model ID is required');
  }

  try {
    // Replace 'GPT_STORE_PLATFORM_API_URL' and 'API_KEY' with actual values
    const gptStoreResponse = await axios.get(`GPT_STORE_PLATFORM_API_URL/models/${modelId}?apiKey=API_KEY`); https://platform.openai.com/api-keys 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
    
    

    // Assuming the response structure. Process it to include only the required data
    const reviewData = {
      name: gptStoreResponse.data.name,
      image: gptStoreResponse.data.image,
      rating: gptStoreResponse.data.rating,
      useCaseDescription: gptStoreResponse.data.useCaseDescription,
      // Add any other valuable data processing here
    };

    console.log('Successfully generated review data for model ID:', modelId);
    res.json(reviewData);
  } catch (error) {
    console.error('Error fetching GPT model data:', error.message);
    console.error(error.stack);
    res.status(500).send('Failed to generate review due to an error');
  }
});

module.exports = router;