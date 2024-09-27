const express = require("express");
const app = express();
require("dotenv").config();
const cors = require("cors");
const cookieParser = require("cookie-parser");
const { MongoClient, ServerApiVersion, ObjectId } = require("mongodb");
const jwt = require("jsonwebtoken");
const morgan = require("morgan");
const port = process.env.PORT || 5000;

// > need to remove this before deploy
const os = require("os");
// Function to get the local IP address
function getLocalIP() {
	const interfaces = os.networkInterfaces();
	const addresses = [];

	for (let k in interfaces) {
		for (let k2 in interfaces[k]) {
			const address = interfaces[k][k2];
			if (address.family === "IPv4" && !address.internal) {
				addresses.push(address.address);
			}
		}
	}

	// console.log("Local IP Address:", addresses);
	return addresses[0];
}
// Call the function to get the local IP address
// getLocalIP();

const ip = process.env.IP || getLocalIP();
// const ip = process.env.IP || "192.168.0.109";
//> --------------------------------------------------------------------------

// middleware
const corsOptions = {
	origin: [
		"http://localhost:5173",
		"http://localhost:5174",
		`http://${ip}:5173`,
		`http://${ip}:5174`,
	],
	credentials: true,
	optionSuccessStatus: 200,
};
app.use(cors(corsOptions));
app.use(express.json());
app.use(cookieParser());
app.use(morgan("dev"));

const verifyToken = async (req, res, next) => {
	const token = req.cookies?.token;
	console.log(token);
	if (!token) {
		return res.status(401).send({ message: "unauthorized access" });
	}
	jwt.verify(token, process.env.ACCESS_TOKEN_SECRET, (err, decoded) => {
		if (err) {
			console.log(err);
			return res.status(401).send({ message: "unauthorized access" });
		}
		req.user = decoded;
		next();
	});
};

const client = new MongoClient(process.env.DB_URI, {
	serverApi: {
		version: ServerApiVersion.v1,
		strict: true,
		deprecationErrors: true,
	},
});
async function run() {
	try {
		const database = client.db("stayVista");
		const roomCollection = database.collection("rooms");

		//: auth related api
		// app.post("/jwt", async (req, res) => {
		// 	const user = req.body;
		// 	console.log("I need a new jwt", user);
		// 	const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
		// 		expiresIn: "365d",
		// 	});
		// 	res
		// 		.cookie("token", token, {
		// 			httpOnly: true,
		// 			secure: process.env.NODE_ENV === "production",
		// 			sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
		// 		})
		// 		.send({ success: true });
		// });
		app.post("/jwt", async (req, res) => {
			try {
				const user = req.body;
				console.log("new user", user);
				const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
					expiresIn: "365d",
				});
				res
					.cookie("token", token, {
						httpOnly: true,
						secure: process.env.NODE_ENV === "production",
						sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
					})
					.send({ success: true });
			} catch (error) {
				console.log("error: ", error);
				res.status(500).send(error);
			}
		});

		//: Logout
		// app.get("/logout", async (req, res) => {
		// 	try {
		// 		res
		// 			.clearCookie("token", {
		// 				maxAge: 0,
		// 				secure: process.env.NODE_ENV === "production",
		// 				sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
		// 			})
		// 			.send({ success: true });
		// 		console.log("Logout successful");
		// 	} catch (err) {
		// 		res.status(500).send(err);
		// 	}
		// });
		app.get("/logout", async (req, res) => {
			try {
				res
					.clearCookie("token", {
						maxAge: 0,
						secure: process.env.NODE_ENV === "production",
						sameSite: process.env.NODE_ENV === "production" ? "none" : "strict",
					})
					.send({ success: true });
				console.log("logOut successful");
			} catch (error) {
				console.log("error: ", error);
				res.status(500).send(error);
			}
		});

		//: Save or modify user email, status in DB
		app.put("/users/:email", async (req, res) => {
			const email = req.params.email;
			const user = req.body;
			const query = { email: email };
			const options = { upsert: true };
			const isExist = await usersCollection.findOne(query);
			console.log("User found?----->", isExist);
			if (isExist) return res.send(isExist);
			const result = await usersCollection.updateOne(
				query,
				{
					$set: { ...user, timestamp: Date.now() },
				},
				options
			);
			res.send(result);
		});

		//: get all rooms from db
		app.get("/rooms", async (req, res) => {
			try {
				const result = await roomCollection.find().toArray();
				res.send(result);
			} catch (error) {
				console.log("error: ", error);
				res.status(500).send(error);
			}
		});

		//: get a single room data from db using _id
		app.get("/room/:id", async (req, res) => {
			try {
				const id = req.params.id;
				const query = { _id: new ObjectId(id) };
				const result = await roomCollection.findOne(query);
				res.send(result);
			} catch (error) {
				console.log("error: ", error);
				res.status(500).send(error);
			}
		});

		//: custom http get
		app.get("/m", async (req, res) => {
			try {
				//: get
				if (req.query.c) {
					const collections = await database.listCollections().toArray();

					const collectionNames = {};
					let idx = 1;
					for (const collectionInfo of collections) {
						const collectionName = database.collection(collectionInfo.name);
						const estimateCount = await collectionName.estimatedDocumentCount();
						collectionNames[idx] = `${
							collectionInfo.name
						} - (${estimateCount}) ${
							req.query.c === collectionInfo.name
								? "--------------------- Selected "
								: ""
						}`;
						idx++;
					}

					const collectionName = database.collection(req.query.c);
					const result = await collectionName
						.find()
						// .sort({ _id: -1 })
						.sort({ updatedAt: -1 })
						.toArray();

					res.send([collectionNames, ...result]);
				}

				//: delete all
				// http://localhost:5000/m?d=payments
				// else if (req.query.d) {
				// 	const collectionName = database.collection(req.query.d);
				// 	res.send(await collectionName.deleteMany({}));
				// }

				//: delete single
				// http://localhost:5000/m?d=menu&id=666f02f024cd4588f4612851
				// else if (req.query.d && req.query.id) {
				// 	const collectionName = database.collection(req.query.d);
				// 	const result = await collectionName.deleteOne({
				// 		_id: new ObjectId(req.query.id),
				// 	});
				// 	res.send(result);
				// }
				else {
					res.send({ message: "else" });
				}
			} catch (error) {
				console.error("error: ", error);
				res.status(500).send(error);
			}
		});

		// Send a ping to confirm a successful connection
		// await client.db("admin").command({ ping: 1 });
		// console.log(
		// 	"Pinged your deployment. You successfully connected to MongoDB!"
		// );
	} finally {
		// Ensures that the client will close when you finish/error
		// await client.close();
	}
}
run().catch(console.dir);

// app.get("/", (req, res) => {
// 	res.send("Hello from StayVista Server..");
// });

// app.listen(port, () => {
// 	console.log(`StayVista is running on port ${port}`);
// });

// > need to remove this before deploy
app.get("/", (req, res) => {
	res.send(`http://${ip}:${port}`);
});

app.listen(port, ip, () => {
	console.log(`http://${ip}:${port}`);
});
//> ----------------------------------------------------------------------
