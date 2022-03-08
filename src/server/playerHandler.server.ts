import { Players, Workspace } from "@rbxts/services";

Players.PlayerAdded.Connect((player) => {
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
