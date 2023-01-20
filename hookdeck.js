const axios = require("axios").default;

// Docs on event and context https://www.netlify.com/docs/functions/#the-handler-method
exports.handler = async (event, context) => {
  try {
    const body = JSON.parse(event.body);
    const username = body.sender.login;
    const avatarUrl = body.sender.avatar_url;
    const repoName = body.repository.name;
    const res = await axios.post('https://discord.com/api/webhooks/1065405532464238742/nrYJf0bneeJAt1gx1O7LMQME41hn67CEL6JSzfyRUsJ8k6gO_YzzL7BZ67nSF8bwFFdf', {
      content: ` ${username} just starred ${repoName}! `,
      embeds: [
        {
          image: {
            url: avatarUrl,
          },
        },
      ],
    });
    console.log("Submitted!");
    return {
      statusCode: 204,
    };
  } catch (err) {
    return { statusCode: 500, body: err.toString() };
  }
};