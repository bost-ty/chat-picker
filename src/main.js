import { WebcastPushConnection } from "tiktok-live-connector";
import WebSocket, { WebSocketServer } from "ws";
// TikTok Live setup
const targetUsername = "dripglitch";
const ttlOptions = {
	processInitialData: false,
	fetchRoomInfoOnConnect: false,
};
const ttl = new WebcastPushConnection(targetUsername, ttlOptions);
const connect = false;
if (connect) {
	try {
		await ttl.connect();
		console.log("Connected!");
	} catch (error) {
		console.error("Failed to connect", error);
	}
	ttl.on("chat", ({ uniqueId, comment }) => {
		console.log(`CHAT:\n${uniqueId}: ${comment}`);
	});
	ttl.on("roomUser", ({ viewerCount }) => {
		console.log(`VIEWERS:\n${viewerCount}`);
	});
	ttl.on("like", ({ totalLikeCount, likeCount }) => {
		console.log(`LIKES:\n+${likeCount}\n=${totalLikeCount}`);
	});
	ttl.on("share", () => {});
	ttl.on("follow", () => {});
}
// WebSocket server setup
const wss = new WebSocketServer({ port: 9099 });
wss.on("connection", (ws) => {
	console.log(wss.clients);
	if (ws.readyState === WebSocket.OPEN) console.log("ready!");
	ws.on("error", console.error);
	ws.on("message", () => {});
});
