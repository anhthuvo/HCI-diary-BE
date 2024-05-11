const OpenAI = require("openai")
const dotenv = require("dotenv")
dotenv.config()

const openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY,
});

const chatting = async (req, res, next) => {
    const prompts = req.body.prompts

    const chatCompletions = await openai.chat.completions.create({
        messages: [{ role: "user", content: prompts }],
        model: "gpt-3.5-turbo",
    });

    const response = chatCompletions?.choices?.[0]?.message?.content
    if (!prompts || !response ) {
        const error = new HttpError(
            'chat fail',
            500
        );
        return next(error);
    }

    res.status(200).json({
        data: response
    });
}

module.exports = {
    chatting,
}