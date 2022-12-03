const { OPENAI_SECRET_KEY } = require("../config.json");
const { Configuration, OpenAIApi } = require("openai");
const configuration = new Configuration({
  apiKey: OPENAI_SECRET_KEY,
});
const openai = new OpenAIApi(configuration);
const Personalities = 
{
    def : "You are an energetic Golden Retriever who is my pet. Your name is \"Biscuit\"\n",
    none : ""
}

module.exports = {
    async execute(message) {
        var prompt =  Personalities.def + `Respond to the prompt \'${message.content.substring(22)}\'\n`;
        if(message.content.includes("Remove Emotional Affect"))
        {
            prompt = Personalities.none + `\'${message.content.substring(message.content.indexOf("Remove Emotional Affect") + 25)}\'\n`;
        }
        (async () => {
            const gptResponse = await openai.createCompletion({
                model: "text-davinci-003",
                prompt: prompt,
                temperature: 0.6,
                max_tokens: 1024,
              });
            message.reply(`${gptResponse.data.choices[0].text}`);

        })();
	},
};