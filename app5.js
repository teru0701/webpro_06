const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  if ((hand === 'グー' && cpu === 'チョキ') ||
  (hand === 'チョキ' && cpu === 'パー') ||
  (hand === 'パー' && cpu === 'グー')) {
  judgement = '勝ち';
  win += 1;
  } else if (hand === cpu) {
  judgement = '引き分け';
  } else {
  judgement = '負け';
  }
  
  total += 1;
  // 今はダミーで人間の勝ちにしておく
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

//新機能1:サイコロゲーム
app.get("/dice", (req, res) => {
  const userDice = Math.floor(Math.random() * 6 + 1);
  const enemyDice = Math.floor(Math.random() * 6 + 1);
  let result = "";

  if (userDice > enemyDice) {
    result = "あなたの勝ち！";
  } else if (userDice < enemyDice) {
    result = "あなたの負け...";
  } else {
    result = "引き分け";
  }

  res.render("dice", { userDice, enemyDice, result });
});

//新機能2:ポ◯モン
app.get("/battle", (req, res) => {
  const userChoice = req.query.choice || "炎";
  const choices = ["炎", "水", "草"];
  const enemyChoice = choices[Math.floor(Math.random() * choices.length)];

  let result = "";
  if (
    (userChoice === "炎" && enemyChoice === "草") ||
    (userChoice === "水" && enemyChoice === "炎") ||
    (userChoice === "草" && enemyChoice === "水")
  ) {
    result = "相性抜群だ！";
  } else if (
    (userChoice === "炎" && enemyChoice === "水") ||
    (userChoice === "水" && enemyChoice === "草") ||
    (userChoice === "草" && enemyChoice === "炎")
  ) {
    result = "イマイチのようだ...";
  } else {
    result = "普通だ";
  }

  res.render("battle", { userChoice, enemyChoice, result });
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
