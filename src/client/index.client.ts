import { Players, Workspace, StarterGui } from "@rbxts/services";

// Instances
const player = Players.LocalPlayer;
const spawn = Workspace.Spawn.WaitForChild((player.WaitForChild("Spawn") as StringValue).Value) as Spawn;

// Disable Core Gui
StarterGui.SetCoreGuiEnabled(Enum.CoreGuiType.All, false);

// Character Added Listener
player.CharacterAdded.Connect((character) => {
	const humanoid = character.WaitForChild("Humanoid") as Humanoid;
	humanoid.WalkSpeed = 0;
	humanoid.UseJumpPower = true;
	humanoid.JumpPower = 0;
	const humanoidrootpart = character.WaitForChild("HumanoidRootPart") as Part;
	humanoidrootpart.CFrame = new CFrame(spawn.Position.X, 5, spawn.Position.Z);
});
