import express  from "express";
import db from "./data/db.js";

const app = express();
const PORT = 3321;
app.use(express.json());

app.get("/telepules", (req, res) => {
    const nev = req.query.nev;
    const telepules = db.prepare("SELECT * FROM telepulesek WHERE nev = ?").get(nev);
    if (!telepules){
        return res.status(404).json({ error: "Település nem található" });
    }
    res.status(200).json(telepules);
});

app.get("/tanora", (req, res) => {
    const orak = db.prepare("SELECT datum, terem, orasorszam FROM tanorak where tantargy = angol").all(datum, terem, orasorszam);
    res.status(200).json(orak);
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});