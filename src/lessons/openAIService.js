import { OpenAI } from 'openai';
import fs from 'fs';
import { systemPrompt, sampleTranscription } from '../config/openAIConfig';

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
                {"role": "system", "content": systemPrompt},
                {"role": "user", "content": transcription}
            ],
            model: "gpt-4o-mini",
        });
        
}
}

export const openAIService = new OpenAIService();