import app from "./app.js";
import { db } from "./config/db.js";
import "./config/qdrant.js";

const port = process.env.PORT|| 3000 ;

// db 
db()

//  localhost:
app.listen(port, () => {
  console.log(`localhost running at ${port}`);
});
