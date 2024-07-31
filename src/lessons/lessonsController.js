import fs from 'fs';
import OpenAI from 'openai';
import { PrismaClient } from '@prisma/client'

const openai = new OpenAI(process.env.OPENAI_API_KEY);
const prisma = new PrismaClient()

class LessonsController {
    async getLessons(req, res) {
        const lessons = await prisma.lesson.findMany()
        res.json(lessons)
    }

    async getLesson(req, res) {
        const { id } = req.params
        const lesson = await prisma.lesson.findUnique({
            where: { id },
        })
        res.json(lesson)
    }
    
    async createLesson(req, res) {

        const { title } = req.body
        const audioFile = req.file
    
        const transcription = await openai.audio.transcriptions.create({
            file: fs.createReadStream(audioFile.path),
            model: "whisper-1",
        });
    
        const lesson = await prisma.lesson.create({
            data: { title , transcription: transcription.text },
        })
    
        const teachingFeedback = await openai.chat.completions.create({
            messages: [
                {"role": "system", "content": "Summarise this text."},
                {"role": "user", "content": sampleTranscription}
            ],
            model: "gpt-4o-mini",
        });
    
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

var sampleTranscription = `[Music]

everyone from Age 3 to 103 finds writing

hard we all find clever ways of avoiding

it I do and I've been writing mainly

educational stuff and some poetry and

stories since I was a

teenager this program is is about guided

writing we'll see how teachers in one

primary school are guiding children to

overcome that fear of the blank

page writing isn't just about

communication it's also about

composition writing enables the writer

to order thoughts in the brain in a way

that isn't possible

otherwise the arm and the Hand aren't

just a computer lead going from the

brain to the page or the screen the fact

of writing is made in the act of writing

St Peter's Primary School in Telford

organizes its classes vertically in

2-year groups writing has been the focus

for the school's development this

Academic Year Thomas the school has an

excellent reputation for Creative

teaching and learning guly writing has

always been an important concept for us

and but I think it needed refreshing and

we were looking for a different way of

targeting particular groups of children

and guly writing seemed for us to be

just that Nicola Lewis's year 1 and two

class has visited Stafford Castle which

is the inspiration for this factual

guided writing session photographs of

the trip have been used to prompt the

children's writing and now one of the

final stages of their work involves

creating a guide

book

let's have a look inside our big book

what have we got so far a contents page

what is

missing paragraph a paragraph of general

information I'm hoping that the children

will make a paragraph of writing for

their information book we've already

discussed the vocabulary that we want

them to use which is some of which has

come from the visit Stafford castle and

the others come through research both in

books and the internet

one of the important things today is

that you are practicing what you're

going to write before you write it so

you'll need to agree with your partner

the whole sentence before you write it

down that

makes that's good thing

no in a second I'm going to put these

headphones on and have a little listen

to what Nicola is doing with the group

with whom she's working this morning

in a minute it's not always easy

managing the class to free up time with

a guided writing group but the

individual attention can pay

dividends these children are some of the

more able but they still have their own

needs and their own challenges to meet I

want you to compose your first sentence

together to make a really good sentence

using the first word in your vocabulary

[Music]

list

I don't know what I should do with the

illumination manuscript I don't know how

to start it was an illuminated

manuscript it's a book and that has

fancy writing and beautiful pictures so

how would you start your sentence

then sa what do you think you might even

artist made book that had

um pictures and these were

called manuscrip illuminated manuscripts

that's fine I really like the way that

uh nicolar is rehearsing orally with the

children some of these quite complicated

sentences uh which they're going to

write so if you change your full stop to

a comma then you can carry on writing

and you might put the Mason would make

and then name some of those things that

you would

made capital letter do you need a

capital letter a comma no but you need

to remember to put something at the end

when you've written those things what's

that going to be a full stop okay and of

course there's always the old Soldiers

of sentence Beginnings full stops commas

when you have a capital letter when you

don't and that's all part of it it's not

being done as a separate thing it's all

part of the overall active writing right

what's your next word on your vocabulary

list undering and what is undermining

Oliver when the enemies dig under the

walls to get to the other side so what

what are you how are you going to carry

on if the siege didn't work stop you

remember that if the siege didn't work

okay that will be your sentence stter

and carry on

[Music]

then we can use your your work for the

feedback in the plary

[Music]

session in the castle there is a person

called a Mason that makes things out to

Stone to protect the castle the Mason

would make the floor stairs and the

arrows s what did you have to do to make

it that brilliant we added some coms to

make some more detail to who it so it

makes more sense to the for a writing

well done for your readers to read it

and understand it give me a thumbs up if

you think she's done really well

think well Nica that seemed to go like a

flash is that the normal way that you

organize guided writing in these kinds

of groups yes they tend to be ability

groups although there is some degree of

flexibility within that for example if

one child is struggling with s

construction then I would put them into

a different guided writing group that

would cover that yes the other thing I

really like was the way that I could see

pairs of children are helping each other

uh feeding off each other's efforts

building on each other's efforts I

thought that was very

impressive what kind of ambition uh do

you have for them as

writers um well being able to articulate

what they want to say in the right kind

of way you using comp more complex

sentences um good vocabulary uh s

structure um and really getting at some

of those those higher order skills and

with great cheerfulness of spirits he

pushed on towards the Wild Wood which

lay putting those higher order skills

into practice is the year five and six

class with teacher CLA James after

hearing an excerpt from The Wind in the

Willows CLA asks the children to think

about the kind of language which makes

an effective story

opening the children discuss in pairs

before sharing their ideas with the rest

of the

class how do you create a suitable

atmosphere powerful verbs fantastic

powerful

verbs

personification well then you can use

similies as well take a close look at

the

board we're going to be thinking about a

suspense story so what other word might

you know suspense story bye um it could

be like a scary story yes it is in a

moment I would like you to write your

own opening to a suspense story and I

would like your

character to turn the door KN and open

the

door okay here we go

again what

wait as I turn the how can we show how

our character is feeling should be like

shaking a bit

maybe their hand is trembling as they

reach out towards the door and BR in I

was thinking of like describing how what

the door looks like saying as it's quite

Rusty and old and like the paint's

flaking have you got an idea for your

sentence

then H not at the moment just thinking

it through I'm going to do like like

where something happens like to the door

knob like it's not just creaking it's

like having another sound when you turn

the door knob the grinding when you

actually open the door that's when it

creaks okay so we need to think through

that sentence for you

[Music]

[Applause]

[Music]

[Applause]

spam

trembling James reached uncontrollably

to the old rusted door knob why did you

use the word

uncontrollably I thought of like having

it having James like being possessed by

something so it was being like forced to

open this door perhaps you could talk

about your arms having a mind of their

own so try and add to that idea a bit

and really explain what's going on to

your re I really like the way that

Claire is getting them to empathize with

the character whoever that character is

going to be with the with the

protagonist get inside the skin of that

protagonist how is is that person

feeling a thin shaft of light from a

tiny window bounced off an empty bottle

and

illuminated um

illuminated where is the where is the

piano it's like in a corner in the Cor

corner of the room so perhaps try that

okay and then get closer to the piano

and then you could describe the dust

yeah actually what I was thinking I just

thought of like it illuminated something

but don't actually say what it is at the

moment until I get closer and then you

find out what it is so how Cameron knows

something about suspense don't give the

game away too quickly hint not tell

silhouetted Thomas could you read out

your opening to the class trembling

James's hand that seemed to have a mind

of its own reached uncontrollably to the

old rusted door knob he edged

forward as if he had been harpooned and

was being dragged towards the box in the

center Center Closer Closer cobwebs

clutched at his clothes and the dripping

sound of water was a chorus of bells

what did Thomas do well do you think I

like the way he used the metaph for um

the I think it was the sand of dripping

water was a chorus of bells um well he

used honed yes it was a very powerful

image wasn't it him being dragged in

having that no control it's really got a

grip of him how successful was Thomas's

opening yes I think it was quite

successful wasn't it Well Done Thomas

thank out of that particular group was

there anybody that you would say made a

big leap forward in the course of the

after afternoon or was it a bit of

progress or around I was pleased with

Thomas because particularly his sentence

started um he's found it a bit more

difficult to um include a range so I was

really pleased that straight away he was

really working on um using different

words such as trembling from the very

starts and he's really working on that

so that was I was really pleased I hear

that guided writing isn't just for the

children oh absolutely not um and as it

happens we've got an evening tomorrow

when we've invited parents and children

into school just to look at how writing

develops in school that's worked very

well for us um and it's a chance for us

to show parents how we teach writing and

how we can develop and progress from

reception right through to year five and

six if they've got a basic understanding

of this early age you just got to help

them as they get older it will become

easier the longer they're doing

it I just come along to see how my

granddaughter da is being taught how to

write so that we can help her if she

needs any assistance although they're

actually better than we are I think the

flip side of the fear of writing which

we all feel is the profound satisfaction

which a completed piece of writing gives

it exercises an emotional muscle which

has something to do with having imposed

some kind of order on a bit of the world

and it's that satisfaction which the

children at St Peters are beginning to

[Music]

feel

`