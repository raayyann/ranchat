import { Players, SoundService } from "@rbxts/services";
import { createClientRemoteEvents } from "@rbxts/remoteevent";
import { events } from "shared/common";

// Instances
const event = createClientRemoteEvents(events);
const player = Players.LocalPlayer;
const mainUi = script.Parent as MainUI;
const menu = mainUi.BG.Menu;
const meViewport = mainUi.BG.Viewport.Me;
const otherViewport = mainUi.BG.Viewport.Other;

// Functions
const updateResolution = () => {
	if (mainUi.AbsoluteSize.X < mainUi.AbsoluteSize.Y) {
		meViewport.Size = new UDim2(1, 0, 0.5, 0);
		otherViewport.Size = new UDim2(1, 0, 0.5, 0);
		otherViewport.Position = new UDim2(0, 0, 0.5, 0);
	} else {
		meViewport.Size = new UDim2(0.5, 0, 1, 0);
		otherViewport.Size = new UDim2(0.5, 0, 1, 0);
		otherViewport.Position = new UDim2(0.5, 0, 0, 0);
	}
};

const getName = (plr: Player): string => {
	return plr.DisplayName === plr.Name ? plr.Name : `${plr.DisplayName} (${plr.Name})`;
};

const getThumbnail = (plr: Player): string => {
	return Players.GetUserThumbnailAsync(
		plr.UserId,
		Enum.ThumbnailType.AvatarThumbnail,
		Enum.ThumbnailSize.Size420x420,
	)[0];
};

// Mobile Support
updateResolution();
mainUi.GetPropertyChangedSignal("AbsoluteSize").Connect(updateResolution);

// Set Me
meViewport.PlayerName.Text = getName(player);
meViewport.Image = getThumbnail(player);

// Start/Next Button Handler
menu.Next.MouseButton1Click.Connect(() => {
	menu.Next.Visible = false;
	menu.Stop.Visible = true;
	menu.Next.ButtonText.Text = "Next";
	otherViewport.Text.Text = "Matching...";
	event.server.queue();
});

// Stop Button Handler
menu.Stop.MouseButton1Click.Connect(() => {
	menu.Stop.Visible = false;
	event.server.stop();
});

// Matched Event Handler
event.client.matched((plr) => {
	otherViewport.Text.Text = "";
	menu.Next.Visible = true;
	menu.Stop.Visible = true;
	otherViewport.PlayerName.Text = getName(plr);
	otherViewport.Image = getThumbnail(plr);
	SoundService.SetListener(Enum.ListenerType.CFrame, (plr.Character?.WaitForChild("Head") as Part)?.CFrame);
});

// Skipped Event Handler
event.client.skipped((skipper) => {
	otherViewport.Image = "";
	menu.Next.Visible = false;
	menu.Stop.Visible = true;
	otherViewport.PlayerName.Text = "";
	SoundService.SetListener(Enum.ListenerType.Camera);
	otherViewport.Text.Text = "Matching...";
	if (skipper === player.Name) wait(2);
	event.server.queue();
});

// Stopped Event Handler
event.client.stopped(() => {
	otherViewport.Image = "";
	otherViewport.PlayerName.Text = "";
	SoundService.SetListener(Enum.ListenerType.Camera);
	menu.Next.Visible = true;
	menu.Next.ButtonText.Text = "Start";
	otherViewport.Text.Text = 'Press "Start" to start talk with random player';
});
