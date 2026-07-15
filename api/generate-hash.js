import bcrypt from "bcrypt";

const password = "909052Ms@";

const hash = await bcrypt.hash(password, 10);

console.log(hash);