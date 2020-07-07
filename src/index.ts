import { EventEmitter } from 'events';

import { Plugin } from '../../plugin-api';
import {
	MenuAPI, Menu, CurrentMenu,
	RootMenu, ChildMenu, OverlayMenu
} from './api';

type Nullable<T> = T | null;

export default class extends Plugin {
	public api: MenuAPI;

	public constructor() {
		super({
			id: 'menu-api',
			name: 'Menu API',
			description: null,
			version: '1.0.0',
			author: 'Assasans'
		});

		this.api = {
			getCurrent: (): CurrentMenu => {
				throw new Error('Plugin not loaded');
			},
			getFriendly: (): string[] => {
				throw new Error('Plugin not loaded');
			},
			emitter: new EventEmitter()
		};
	}

	private getBaseMenu(): Nullable<CurrentMenu> {
		if($('div[data-style="FatalErrorScreenStyle-container Common-background"]').length > 0) return new CurrentMenu(RootMenu.CriticalError);

		if($('div[data-style="EntranceComponentStyle-ContainerForm"] div[data-style="LoginComponentStyle-buttonPlay"]').length > 0) return new CurrentMenu(RootMenu.Auth, ChildMenu.AuthLogin);
		if($('div[data-style="EntranceComponentStyle-ContainerForm"] div[data-style="EntranceComponentStyle-blockInformation"]').length > 0) return new CurrentMenu(RootMenu.Auth, ChildMenu.AuthRegistration);
		if($('div[data-style="EntranceComponentStyle-ContainerForm"] div[data-style="RegistrationComponentStyle-buttonsRepealRecovery"]').length > 0) return new CurrentMenu(RootMenu.Auth, ChildMenu.AuthPasswordRecovery);

		if($('div[data-style="BattleHudComponentStyle-hudContainer"]').length > 0) return new CurrentMenu(RootMenu.Battle);
		if($('div[data-style="BattlePickComponentStyle-blockCenter"]').length > 0) return new CurrentMenu(RootMenu.PlayModes);
		if($('div[data-style="BattleTableStyle-blockButtonsSearchFilter"]').length > 0) return new CurrentMenu(RootMenu.BattlesList);
		if($('div[data-style="BattleInfoComponentStyle-commonContainer"]').length > 0) return new CurrentMenu(RootMenu.BattleInfo);
		if($('div[data-style="InformationComponentStyle-buttonCustomOptions"]').length > 0) return new CurrentMenu(RootMenu.BattleCreate);
		if($('div[data-style="BattleOptionsSectionComponentStyle-battleOptions"]').length > 0) return new CurrentMenu(RootMenu.BattleCreate, ChildMenu.BattleCreateSettings);

		if($('div[data-style="NewsComponentStyle-newsWindow"]').length > 0) return new CurrentMenu(RootMenu.MainMenu, ChildMenu.News);

		if($('div[data-style="ClanHeaderComponentStyle-blockInform"]').length > 0) return new CurrentMenu(RootMenu.Clan, ChildMenu.ClanInfo);
		if($('div[data-style="ClanCommonStyle-content"] div[data-style="FriendListComponentStyle-containerMembers FriendListComponentStyle-containerFriends"]').length > 0) return new CurrentMenu(RootMenu.Clan, ChildMenu.ClanMembers);

		if($('div[data-style="Style-containerCenterLootBox"] div[data-style="Style-possibleRewardsContainer"]').length > 0) return new CurrentMenu(RootMenu.Containers, ChildMenu.ContainersRewards);
		if($('div[data-style="Style-lootBoxContainers"]').length > 0) return new CurrentMenu(RootMenu.Containers);

		if($('div[data-style="QuestComponentStyle-content"] div[data-style="Style-battleTitleCommunity"] span[data-style="Common-yellowColor"]:nth-child(1)').length > 0) return new CurrentMenu(RootMenu.Missions, ChildMenu.MissionsSpecial);
		if($('div[data-style="QuestComponentStyle-content"] div[data-style="Style-battleTitleCommunity"] span[data-style="Common-yellowColor"]:nth-child(2)').length > 0) return new CurrentMenu(RootMenu.Missions, ChildMenu.MissionsDaily);
		if($('div[data-style="QuestComponentStyle-content"] div[data-style="Style-battleTitleCommunity"] span[data-style="Common-yellowColor"]:nth-child(3)').length > 0) return new CurrentMenu(RootMenu.Missions, ChildMenu.MissionsWeekly);
		if($('div[data-style="QuestComponentStyle-content"] div[data-style="Style-battleTitleCommunity"] span[data-style="Common-yellowColor"]:nth-child(4)').length > 0) return new CurrentMenu(RootMenu.Missions, ChildMenu.MissionsChallenges);

		if($('ul[data-style="SettingsComponentStyle-blockMenuOptions"] li[data-style="SettingsComponentStyle-menuItemOptions SettingsComponentStyle-activeItemOptions"]:nth-child(1)').length > 0) return new CurrentMenu(RootMenu.Settings, ChildMenu.SettingsGame);
		if($('ul[data-style="SettingsComponentStyle-blockMenuOptions"] li[data-style="SettingsComponentStyle-menuItemOptions SettingsComponentStyle-activeItemOptions"]:nth-child(2)').length > 0) return new CurrentMenu(RootMenu.Settings, ChildMenu.SettingsGraphics);
		if($('ul[data-style="SettingsComponentStyle-blockMenuOptions"] li[data-style="SettingsComponentStyle-menuItemOptions SettingsComponentStyle-activeItemOptions"]:nth-child(3)').length > 0) return new CurrentMenu(RootMenu.Settings, ChildMenu.SettingsSound);
		if($('ul[data-style="SettingsComponentStyle-blockMenuOptions"] li[data-style="SettingsComponentStyle-menuItemOptions SettingsComponentStyle-activeItemOptions"]:nth-child(4)').length > 0) return new CurrentMenu(RootMenu.Settings, ChildMenu.SettingsControls);
		if($('ul[data-style="SettingsComponentStyle-blockMenuOptions"] li[data-style="SettingsComponentStyle-menuItemOptions SettingsComponentStyle-activeItemOptions"]:nth-child(5)').length > 0) return new CurrentMenu(RootMenu.Settings, ChildMenu.SettingsAccount);

		if($('div[data-style="GarageCommonStyle-garageContainer"] div[data-style="Style-blockButtonsQECommunity"] div[data-style="Style-battleTitleCommunity"] span[data-style="Common-yellowColor"]:nth-child(1)').length > 0) return new CurrentMenu(RootMenu.Garage, ChildMenu.GarageWeapons);
		if($('div[data-style="GarageCommonStyle-garageContainer"] div[data-style="Style-blockButtonsQECommunity"] div[data-style="Style-battleTitleCommunity"] span[data-style="Common-yellowColor"]:nth-child(2)').length > 0) return new CurrentMenu(RootMenu.Garage, ChildMenu.GarageHulls);
		if($('div[data-style="GarageCommonStyle-garageContainer"] div[data-style="Style-blockButtonsQECommunity"] div[data-style="Style-battleTitleCommunity"] span[data-style="Common-yellowColor"]:nth-child(3)').length > 0) return new CurrentMenu(RootMenu.Garage, ChildMenu.GarageDrones);
		if($('div[data-style="GarageCommonStyle-garageContainer"] div[data-style="Style-blockButtonsQECommunity"] div[data-style="Style-battleTitleCommunity"] span[data-style="Common-yellowColor"]:nth-child(4)').length > 0) return new CurrentMenu(RootMenu.Garage, ChildMenu.GarageResists);
		if($('div[data-style="GarageCommonStyle-garageContainer"] div[data-style="Style-blockButtonsQECommunity"] div[data-style="Style-battleTitleCommunity"] span[data-style="Common-yellowColor"]:nth-child(5)').length > 0) return new CurrentMenu(RootMenu.Garage, ChildMenu.GarageSupplies);
		if($('div[data-style="GarageCommonStyle-garageContainer"] div[data-style="Style-blockButtonsQECommunity"] div[data-style="Style-battleTitleCommunity"] span[data-style="Common-yellowColor"]:nth-child(6)').length > 0) return new CurrentMenu(RootMenu.Garage, ChildMenu.GaragePaints);
		if($('div[data-style="GarageCommonStyle-garageContainer"]').length > 0) return new CurrentMenu(RootMenu.Garage);

		if($('div[data-style="FriendListComponentStyle-containerFriends"]').length > 0) {
			if($('div[data-style="Style-battleTitleCommunity"] span[data-style="Common-yellowColor"]:nth-child(1)').length > 0) return new CurrentMenu(RootMenu.Friends, ChildMenu.FriendsList);
			if($('div[data-style="Style-battleTitleCommunity"] div[data-style="Style-commonBlock"] span[data-style="Common-yellowColor"]').length > 0) return new CurrentMenu(RootMenu.Friends, ChildMenu.FriendsRequests);
			if($('div[data-style="Style-battleTitleCommunity"] span[data-style="Common-yellowColor"]:nth-child(3)').length > 0) return new CurrentMenu(RootMenu.Friends, ChildMenu.FriendsRefferals);
		}

		if($('div[data-style="BasePaymentComponentStyle-container"]').length > 0) return new CurrentMenu(RootMenu.Shop, ChildMenu.ShopItemInfo);
		if($('div[data-style="VerticalScrollStyle-outerContainerStyle ShopCategoryOfferSectionStyle-outerContainer"]').length > 0) return new CurrentMenu(RootMenu.Shop);

		if($('div[data-style="InvitationWindowsComponentStyle-centerBlock"]').length > 0) return new CurrentMenu(RootMenu.GroupInvite);

		if($('div[data-style="MainScreenComponentStyle-playButtonContainer MainScreenComponentStyle-buttonPlay MainScreenComponentStyle-activeItem"]').length > 0) return new CurrentMenu(RootMenu.MainMenu);

		if($('div#root').children('*').length < 1) return new CurrentMenu(RootMenu.Preload);

		return null;
	}

	private getOverlayMenu(): Nullable<OverlayMenu> {
		if($('div[data-style="ChatComponentStyle-chatWindow"]').length > 0) return OverlayMenu.Chat;

		if($('div[data-style="ApplicationComponentStyle-container Common-background"]').length > 0) OverlayMenu.Loading;

		return null;
	}

	public async load(): Promise<void> {
		const $ = await import('jquery');
		console.log()

		const emitter: EventEmitter = new EventEmitter();

		let currentMenu: Nullable<CurrentMenu> = null;
		$('body').on('DOMSubtreeModified', '*', (event) => {
			const menu: CurrentMenu = this.api.getCurrent();
			if(!currentMenu || !menu.equals(currentMenu)) {
				this.api.emitter.emit('menuChange', menu);
				currentMenu = menu;

				console.log(this.api.getFriendly());
			}
		});

		this.api = {
			getCurrent: (): CurrentMenu => {
				const baseMenu: Nullable<CurrentMenu> = this.getBaseMenu();
				if(baseMenu === null) return new CurrentMenu(RootMenu.Unknown);

				const overlayMenu: Nullable<OverlayMenu> = this.getOverlayMenu();

				return new CurrentMenu(baseMenu.root, baseMenu.child, overlayMenu);
			},
			getFriendly: (): Nullable<string>[] => {
				const array: Nullable<Menu>[] = this.api.getCurrent().array();
				return [
					array[0] === null ? null : RootMenu[array[0]],
					array[1] === null ? null : ChildMenu[array[1]],
					array[2] === null ? null : OverlayMenu[array[2]]
				];
			},
			emitter: emitter
		};
	}

	public async start(): Promise<void> {
	}
}
