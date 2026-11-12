import { describe, expect, it } from "vitest";

import { getSortedActivities } from "@/lib/activitySort";
import type { Activity } from "@/types";

function createActivity(title: string, createdAt: string, updatedAt: string): Activity {
	return { _id: title, title, categories: [], createdAt, updatedAt };
}

const hike = createActivity("hike", "2026-01-01T10:00:00Z", "2026-03-01T10:00:00Z");
const canoe = createActivity("Canoe", "2026-02-01T10:00:00Z", "2026-02-01T10:00:00Z");
const biking = createActivity("Biking", "2026-03-01T10:00:00Z", "2026-03-02T10:00:00Z");
const activities = [hike, canoe, biking];

function titles(sorted: Activity[]) {
	return sorted.map((activity) => activity.title);
}

describe("getSortedActivities", () => {
	it("sorts by creation date", () => {
		expect(titles(getSortedActivities(activities, "newest"))).toEqual([
			"Biking",
			"Canoe",
			"hike",
		]);
		expect(titles(getSortedActivities(activities, "oldest"))).toEqual([
			"hike",
			"Canoe",
			"Biking",
		]);
	});

	it("sorts by last update", () => {
		expect(titles(getSortedActivities(activities, "lastModified"))).toEqual([
			"Biking",
			"hike",
			"Canoe",
		]);
	});

	it("sorts by title regardless of case", () => {
		expect(titles(getSortedActivities(activities, "az"))).toEqual(["Biking", "Canoe", "hike"]);
		expect(titles(getSortedActivities(activities, "za"))).toEqual(["hike", "Canoe", "Biking"]);
	});

	it("does not change the original list", () => {
		getSortedActivities(activities, "az");
		expect(activities).toEqual([hike, canoe, biking]);
	});
});
