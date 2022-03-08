import { createServerRemoteEvents } from "@rbxts/remoteevent";
import { events } from "shared/common";

// Instances
const event = createServerRemoteEvents(events);

// Variables
let queue: Player | undefined;
const talking: Map<String, Player> = new Map<String, Player>();

// Queue Event Handler
event.server.queue((player) => {
	if (talking.has(player.Name)) {
		const otherPlayer = talking.get(player.Name);
		if (otherPlayer) event.client.skipped.fires([player, otherPlayer], player.Name);
		if (otherPlayer?.Name !== undefined) talking.delete(otherPlayer.Name);
		talking.delete(player.Name);
		return;
	}
	if (queue) {
		talking.set(queue.Name, player);
		event.client.matched.fire(queue, player);
		talking.set(player.Name, queue);
		event.client.matched.fire(player, queue);
		queue = undefined;
		return;
	}
	queue = player;
});

// Stop Event Handler
event.server.stop((player) => {
	if (talking.has(player.Name)) {
		const otherPlayer = talking.get(player.Name);
		if (otherPlayer) event.client.skipped.fire(otherPlayer, player.Name);
		if (otherPlayer?.Name !== undefined) talking.delete(otherPlayer.Name);
		talking.delete(player.Name);
	}
	if (queue === player) queue = undefined;
	event.client.stopped.fire(player);
});
