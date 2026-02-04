import express  from "express";
import db from "./data/db.js";

const app = express();
const PORT = 3321;
const URL = "/nyiltnap/api/v1";
app.use(express.json());

app.get(URL +"/telepules", (req, res) => {
    const nev = req.query.nev;
    const telepules = db.prepare("SELECT * FROM telepulesek WHERE nev = ?").get(nev);
    if (!telepules){
        return res.status(404).json({ error: "Település nem található" });
    }
    res.status(200).json(telepules);
});

app.get(URL + "/tanora", (req, res) => {
    const targy = req.query.targy;
    if (!targy){
        return res.status(400).json({ error: "Hiányzó 'targy' lekérdezési paraméter" });
    }
    const orak = db.prepare("SELECT datum, terem, orasorszam FROM tanorak where targy = ? ORDER BY datum, orasorszam").all(targy);
    res.status(200).json(orak);
});

app.get(URL + "/9-matematika-fizika", (req, res) => {
    const csoport = req.query.csoport;
    if (!csoport){
        return res.status(400).json({ error: "Hiányzó 'csoport' lekérdezési paraméter" });
    }
    const matematikaFizikaOrak = db.prepare("SELECT csoport, targy, datum FROM tanorak WHERE csoport = ? AND (targy = 'matematika' OR targy = 'fizika') ORDER BY targy").all(csoport);
    res.status(200).json(matematikaFizikaOrak);
});

// településenként hány diák regisztrált?
app.get(URL + "/telepulesfo", (req, res) => {
    const telepules = db.prepare("SELECT telepules, COUNT(*) AS diak_szam FROM diakok GROUP BY telepules ORDER BY diak_szam DESC").all();
    res.status(200).json(telepules);
});

app.get(URL + "/tantargyak", (req, res) => {
    const visitable = db.prepare(`SELECT targy FROM orak Where ferohely = ?`).all();
    res.status(200).json(visitable);
});
app.get(URL + "/tanar", (req, res) => {
    const datum = req.query.datum.replace(/-/g, '.');
    const tanarnev = req.query.tanar;
    if (!datum || !tanarnev){
        return res.status(400).json({ error: "Hiányzó 'datum' vagy 'tanar' "});
    }
    

});




app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 