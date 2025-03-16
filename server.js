const express = require('express');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(cors());
app.use(express.json());

app.post('/jira-proxy', async (req, res) => {
    try {
        const response = await axios.post(
            'https://abjira.arabbank.com/jira/rest/api/2/issue',
            req.body,
            {
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': 'Bearer YOUR_BEARER_TOKEN'
                }
            }
        );
        res.status(response.status).send(response.data);
    } catch (error) {
        res.status(error.response?.status || 500).send(error.response?.data || 'Error communicating with Jira server.');
    }
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Proxy server running on http://localhost:${PORT}`));
