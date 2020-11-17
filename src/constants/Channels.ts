import * as Discord from 'discord.js';

export interface IChannels {
	general: Discord.TextChannel;
	tw: Discord.TextChannel;
	resources: Discord.TextChannel;
	rules: Discord.TextChannel;
	roles: Discord.TextChannel;
	verification: Discord.TextChannel;
	staff: {
		meet: Discord.TextChannel;
		private: {
			category: Discord.CategoryChannel;
			logs: Discord.TextChannel;
		};
		isolation: {
			category: Discord.CategoryChannel;
			logs: Discord.TextChannel;
		};
		support: Discord.TextChannel;
		moderators: {
			chat: Discord.TextChannel;
			logs: Discord.TextChannel;
			modlogs: Discord.TextChannel;
		};
	};
	community: {
		faq: Discord.TextChannel;
		suggestions: Discord.TextChannel;
		announcements: Discord.TextChannel;
		starboard: Discord.TextChannel;
		discussion: Discord.TextChannel;
		helper: Discord.TextChannel;
	};
}

export default (server: Discord.Guild): IChannels => {
	return {
		general: (server.channels.cache.get('435894444584075265') as Discord.TextChannel),
		tw: (server.channels.cache.get('618002057189785601') as Discord.TextChannel),
		resources: (server.channels.cache.get('435923980336234516') as Discord.TextChannel),
		rules: (server.channels.cache.get('481124133606916096') as Discord.TextChannel),
		roles: (server.channels.cache.get('481131558296616961') as Discord.TextChannel),
		verification: (server.channels.cache.get('760809680598990878') as Discord.TextChannel),
		staff: {
			meet: (server.channels.cache.get('479744966575390733') as Discord.TextChannel),
			private: {
				category: (server.channels.cache.get('768113425867472936') as Discord.CategoryChannel),
				logs: (server.channels.cache.get('768113624861507624') as Discord.TextChannel),
			},
			isolation: {
				category: (server.channels.cache.get('769232209886183455') as Discord.CategoryChannel),
				logs: (server.channels.cache.get('769232273185833020') as Discord.TextChannel),
			},
			support: (server.channels.cache.get('761718388090863616') as Discord.TextChannel),
			moderators: {
				chat: (server.channels.cache.get('452905389596475404') as Discord.TextChannel),
				logs: (server.channels.cache.get('452822928355098635') as Discord.TextChannel),
				modlogs: (server.channels.cache.get('499652797638115348') as Discord.TextChannel),
			},
		},
		community: {
			faq: (server.channels.cache.get('454062697567223808') as Discord.TextChannel),
			suggestions: (server.channels.cache.get('474242779623456779') as Discord.TextChannel),
			announcements: (server.channels.cache.get('435910303864061962') as Discord.TextChannel),
			starboard: (server.channels.cache.get('646971709853007873') as Discord.TextChannel),
			discussion: (server.channels.cache.get('458009085829316609') as Discord.TextChannel),
			helper: (server.channels.cache.get('471799568015818762') as Discord.TextChannel),
		},
	}
};
