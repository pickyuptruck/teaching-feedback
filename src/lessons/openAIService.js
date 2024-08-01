import { OpenAI } from 'openai';
import fs from 'fs';

class OpenAIService {
    constructor() {
        this.openai = new OpenAI(process.env.OPENAI_API_KEY);
    }

    getTranscription = async (audioFile) => {
        return await this.openai.audio.transcriptions.create({
            file: fs.createReadStream(audioFile.path),
            model: "whisper-1",
        });
    }

    getFeedback = async (transcription) => {
        return await this.openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "Summarise this text."},
                {"role": "user", "content": transcription}
            ],
            model: "gpt-4o-mini",
        });
        
}
}

export const openAIService = new OpenAIService();