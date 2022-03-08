export const events = {
	client: {
		matched(player: Player) {},
		skipped(skipper: String) {},
		stopped() {},
	},
	server: {
		queue() {},
		stop() {},
	},
};
