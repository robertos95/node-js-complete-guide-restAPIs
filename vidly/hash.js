const bcrypt = require("bcrypt");

async function run() {
  const salt = await bcrypt.genSalt(10);
  console.log(salt);
  const hashedPw = await bcrypt.hash("1234", salt);
  console.log(hashedPw);
}

run();
