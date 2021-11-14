// Require dependencies
var express = require("express");
var app = express();
const initMiddleware = require("./middleware/index");
const initRoutes = require("./routes/index");
const initDB = require("./config/initDB");
const { Telegraf, Markup } = require("telegraf");
const File = require("./model/File");
const axios = require("axios");

initMiddleware(app);

initDB();

initRoutes(app);

const botToken = process.env.BOT_TOKEN;
const bot = new Telegraf(botToken);

// get message telegraf
bot.on("message", (ctx) => {
  console.log(ctx.message.from);
  if (ctx.message.from.id != "974078091") {
    ctx.reply("You are not authorized to use this app");
    return;
  }
  const message = ctx.message.text;
  if (message.includes("/start")) {
    ctx.reply("Send a link and file name \n Eg: https://fileUrl.com File_Name");
  } else if (message.includes("/help")) {
    ctx.reply("Send a link and file name \n Eg: https://fileUrl.com File_Name");
  } else {
    let url = message.split(" ")[0];
    let fileName = message.split(" ")[1];
    // console.log(url);
    // console.log(fileName);
    if (!url.startsWith("https://")) {
      ctx.reply("Invalid url");
      return;
    } else if (message.split(" ").length > 2) {
      ctx.reply("Invalid File Name");
      return;
    } else {
      const file = new File({
        fileName: fileName,
        url: url,
      });

      file
        .save()
        .then((result) => {
          ctx.reply("File Url Saved");
          console.log(result);
        })
        .catch((err) => {
          if (err.code === 11000) {
            ctx.reply(`${Object.keys(err.keyPattern)} already exists`);
          }
          ctx.reply(`${err._message}, Please try again with proper format or contact admin`);
          // console.log(err._message);
        });
    }

    // Check if string in url
  }
});

// ----------- Convert File to Link Code -----------
// bot.on("message", (ctx) => {
//   if (ctx.message.photo) {
//     getFilePath(ctx.message.photo[0].file_id).then((filePath) => {
//       ctx.reply(`Here's your link https://api.telegram.org/file/bot${botToken}/${filePath}`);
//     });
//   } else if (ctx.message.document) {
//     getFilePath(ctx.message.document.file_id).then((filePath) => {
//       ctx.reply(`Here's your link https://api.telegram.org/file/bot${botToken}/${filePath}`);
//     });
//   } else {
//   }
// });

// async function getFilePath(fileID) {
//   return new Promise((resolve, reject) => {
//     let url = `https://api.telegram.org/bot${botToken}/getFile?file_id=${fileID}`;
//     axios({
//       method: "get",
//       url,
//     })
//       .then(function (response) {
//         // console.log(response.data.result.file_path);
//         if (response.data.result.file_path) {
//           resolve(response.data.result.file_path);
//         }
//       })
//       .catch(function (error) {
//         console.log("Get Error", error);
//         reject(error);
//       });
//   });
// }

bot.launch();

// Listen on port 3000
app.listen(process.env.PORT || 3000, function () {
  console.log("Express server listening on port %d in %s mode", this.address().port, app.settings.env);
});
