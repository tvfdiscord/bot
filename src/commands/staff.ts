const staff: Command = {
	run: (tvf, msg, args) => {
		const role = args.join(' ').toLowerCase();

		const admins = msg.guild.roles
			.get(tvf.roles.ADMIN)
			.members.concat(
				msg.guild.roles.get(tvf.roles.TECHADMIN).members,
			);
		const mods = msg.guild.roles
			.get(tvf.roles.MOD)
			.members.filter((m) => !m.roles.has(tvf.roles.ADMIN))
			.filter((m) => !m.roles.has(tvf.roles.TECHADMIN));
		const fks = msg.guild.roles
			.get(tvf.roles.FK)
			.members.filter((m) => !m.roles.has(tvf.roles.MOD))
			.filter((m) => !m.roles.has(tvf.roles.ADMIN))
			.filter((m) => !m.roles.has(tvf.roles.TECHADMIN));

		if (
			role === 'forest keeper' ||
            role === 'fk' ||
            role === 'forest keepers' ||
            role === 'fks'
		) {
			const embed = tvf
				.createEmbed('green')
				.setTitle('Forest Keepers')
				.setDescription(fks.map((fk) => `<@!${fk.user.id}>`))
				.addField('Amount', fks.size, true)
				.addField(
					'Online',
					fks.filter((fk) => fk.user.presence.status !== 'offline')
						.size,
					true,
				);

			return msg.channel.send(embed);
		}

		if (
			role === 'moderator' ||
            role === 'MOD' ||
            role === 'moderators' ||
            role === 'mods'
		) {
			const embed = tvf
				.createEmbed('red')
				.setTitle('Moderators')
				.setDescription(mods.map((mod) => `<@!${mod.user.id}>`))
				.addField('Amount', mods.size, true)
				.addField(
					'Online',
					mods.filter((mod) => mod.user.presence.status !== 'offline')
						.size,
					true,
				);

			return msg.channel.send(embed);
		}

		if (
			role === 'administrator' ||
            role === 'ADMIN' ||
            role === 'administrators' ||
            role === 'admins'
		) {
			const embed = tvf
				.createEmbed('blue')
				.setTitle('Administrators')
				.setDescription(admins.map((admin) => `<@!${admin.user.id}>`))
				.addField('Amount', admins.size, true)
				.addField(
					'Online',
					admins.filter(
						(admin) => admin.user.presence.status !== 'offline',
					).size,
					true,
				);

			return msg.channel.send(embed);
		}
		else {
			const embed = tvf
				.createEmbed('orange')
				.setTitle('Staff')
				.setDescription(
					`Total: **${admins.size + mods.size + fks.size}**`,
				)
				.addField(
					`Administrators (${admins.size})`,
					admins.map((admin) => `<@!${admin.user.id}>`),
					true,
				)
				.addField(
					`Moderators (${mods.size})`,
					mods.map((mod) => `<@!${mod.user.id}>`),
					true,
				)
				.addField(
					`Forest Keepers (${fks.size})`,
					fks.map((fk) => `<@!${fk.user.id}>`),
					true,
				);

			return msg.channel.send(embed);
		}
	},
	config: {
		name: 'staff',
		description:
            'Allows you to view statistics about the staff like how many are in each position and how many are online, or just view the staff.',
		module: 'Core',
		usage: '*position*',
	},
};

export default staff;
