const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const express = require("express");
const cors = require("cors");
require("dotenv").config();

// define port
const port = process.env.PORT || 5000;

const app = express();

// middlewares
app.use(cors());
app.use(express.json());

// database setup
const uri = process.env.DB_URI;
const client = new MongoClient(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    serverApi: ServerApiVersion.v1,
});

async function run() {
    try {
        // all collection
        const studentCollection = client.db("challenge").collection("students");

        // endpoint

        // save student data in db
        app.post("/student", async (req, res) => {
            const student = req.body;
            const result = await studentCollection.insertOne(student);
            if (result.acknowledged) {
                res.send({ status: true });
            } else {
                res.send({ status: false });
            }
        });

        // get student data from db
        app.get("/student", async (req, res) => {
            const result = await studentCollection.find({}).toArray();
            res.send({data: result})
        });
    } finally {
    }
}

run().catch((err) => {
    console.log(err);
});

app.get("/", (req, res) => {
    res.send("Server is running!");
});

// listen port
app.listen(port, () => {
    console.log(`Server running on port: ${port}`);
});
