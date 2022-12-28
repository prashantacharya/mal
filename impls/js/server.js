const express = require('express');
const { rep } = require('./step6_file');
const app = express();

app.use(express.json());

app.post('/bang', (req, res) => {
  const { code } = req.body;

  const codeToExecute = `
    (do ${code})
  `;

  try {
    const result = rep(codeToExecute);

    res.json({
      result,
    });
  } catch (e) {
    res.status(400).json({
      error: e.message,
    });
  }
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
