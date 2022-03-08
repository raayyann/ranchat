interface MainUI extends ScreenGui {
	BG: Frame & {
		Viewport: Frame & {
			Other: ImageLabel & {
				Text: TextLabel;
				PlayerName: TextLabel;
			};
			Me: ImageLabel & {
				PlayerName: TextLabel;
			};
		};
		Menu: Frame & {
			Stop: TextButton & {
				UICorner: UICorner;
				ButtonText: TextLabel;
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				UIGradient: UIGradient;
			};
			Next: TextButton & {
				UICorner: UICorner;
				ButtonText: TextLabel;
				UIAspectRatioConstraint: UIAspectRatioConstraint;
				UIGradient: UIGradient;
			};
		};
	};
}
