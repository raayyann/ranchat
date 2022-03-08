import { Players, Workspace } from "@rbxts/services";
const VoiceChatService = game.GetService("VoiceChatService");

Players.PlayerAdded.Connect((player) => {
	if (!VoiceChatService.IsVoiceEnabledForUserIdAsync(player.UserId))
		return player.Kick("You don't have voice chat enabled");
	for (let i = 1; i <= 30; i++) {
		const spawn = Workspace.Spawn.WaitForChild(i) as Spawn;
		if (spawn.empty.Value) {
			spawn.empty.Value = false;
			const spawnName = new Instance("StringValue");
			spawnName.Name = "Spawn";
			spawnName.Value = spawn.Name;
			spawnName.Parent = player;
			break;
		}
	}
});

Players.PlayerRemoving.Connect((player) => {
	(Workspace.Spawn.WaitForChild((player.WaitForChild("Spawn") as StringValue).Value) as Spawn).empty.Value = true;
});
