const { Telegraf, Markup } = require('telegraf')
require("dotenv").config()
const text = require("./costants")

const bot = new Telegraf(process.env.BOT_key)
bot.start((ctx) => ctx.reply(`Welcome ${ctx.from.first_name}


🍿 I am Kinobot, I will help you choose a movie to watch

${text.randomFilm} - if you want to see random film 🎲`

))
bot.help((ctx) => ctx.reply(text.commands))
bot.command('course', async (ctx) => {
    try{
        await  ctx.replyWithHTML('<b>Course</b>', Markup.inlineKeyboard(
            [
                [Markup.button.callback('Edits', 'btn_1'), Markup.button.callback('Settings', 'btn_2'),
                Markup.button.callback('JS', 'btn_3')]
                
            ]
        ))
    } catch(e){
        console.error(e)
    }
  
})
function addActionBot(name, src, text){
    bot.action(name, async (ctx)=>{
        try{
            await ctx.answerCbQuery()
            if(src !==false){
                await ctx.replyWithPhoto({
                    source: src
                })
            }
           await ctx.replyWithHTML(text, {
                disable_web_page_preview: true
            })
        }catch(e){
            console.error(e)
        }
    })
}
addActionBot('btn_1', './img/1.webp', text.text1)
addActionBot('btn_2', './img/2.jpg', text.text2)
addActionBot('btn_3', false, text.text3)
bot.launch()

// Enable graceful stop
process.once('SIGINT', () => bot.stop('SIGINT'))
process.once('SIGTERM', () => bot.stop('SIGTERM'))