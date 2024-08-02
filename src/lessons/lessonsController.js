import { lessonsService } from './lessonsService.js'
import { openAIService } from './openAIService.js'

class LessonsController {
    async getLessons(_, res) {
        const lessons = await lessonsService.getLessons()
        res.json(lessons)
    }

    async getLesson(req, res) {
        const { id } = req.params
        const lesson = await lessonsService.getLesson(id)
        res.json(lesson)
    }
    
    async createLesson(req, res) {

        const { title } = req.body
        const audioFile = req.file
        const lesson = await lessonsService.addLesson({ title })
        const transcription = await openAIService.getTranscription(audioFile)
        await lessonsService.updateLesson(lesson.id, { transcription: transcription.text })
        console.log(lesson)
        const teachingFeedback = await openAIService.getFeedback(transcription.text)
        console.log(teachingFeedback.choices[0])
        res.json(lesson)
    }

    async deleteLesson(req, res) {
        const { id } = req.params
        const lesson = await prisma.lesson.delete({
            where: { id },
        })
        res.json(lesson)
    }

}

export const lessonsController = new LessonsController();