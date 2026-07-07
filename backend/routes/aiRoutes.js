const express = require("express");
const router = express.Router();

const { GoogleGenerativeAI } = require("@google/generative-ai");

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

const model = genAI.getGenerativeModel({
    model: "gemini-2.5-flash"
});

router.post("/chat", async (req, res) => {

    try {

        const { message } = req.body;

        if (!message) {

            return res.status(400).json({
                error: "Message is required"
            });

        }

        const prompt = `
You are Hope Nexus AI Assistant.

Your role is to help users with:

1. Healthcare guidance
2. Educational support
3. Career advice
4. Job recommendations
5. Tribal knowledge

Always provide clear, simple and helpful answers.

User Question:
${message}
`;

        const result = await model.generateContent(prompt);

        const response = result.response.text();

        res.json({
            reply: response
        });

    } catch (error) {

        console.error(error);

        res.status(500).json({
            error: "AI response failed."
        });

    }

});

module.exports = router;