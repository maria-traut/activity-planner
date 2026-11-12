import dns from "dns";
import mongoose from "mongoose";

declare global {
	var mongooseCache:
		{ conn: typeof mongoose | null; promise: Promise<typeof mongoose> | null } | undefined;
}

const DNS_SERVERS = process.env.DNS_SERVERS?.split(",");

if (DNS_SERVERS?.length) {
	dns.setServers(DNS_SERVERS);
}

const MONGODB_URI = process.env.MONGODB_URI ?? "";

if (!MONGODB_URI) {
	throw new Error("Please define the MONGODB_URI environment variable inside .env.local");
}

/**
 * Global is used here to maintain a cached connection across hot reloads
 * in development. This prevents connections growing exponentially
 * during API Route usage.
 */
const cached = (global.mongooseCache ??= { conn: null, promise: null });

async function dbConnect() {
	if (cached.conn) {
		return cached.conn;
	}

	if (!cached.promise) {
		const opts = {
			bufferCommands: false,
		};

		cached.promise = mongoose.connect(MONGODB_URI, opts);
	}

	try {
		cached.conn = await cached.promise;
	} catch (e) {
		cached.promise = null;
		throw e;
	}

	return cached.conn;
}

export default dbConnect;
