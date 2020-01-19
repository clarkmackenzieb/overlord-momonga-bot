
const Discord = require('discord.js');
const client = new Discord.Client();
require('dotenv').config();

const lordMomongaId = "663446622759288833";

const ainzWelcomeChannelId = "483910193399463936";
const ainzAffiliateRoleId = "525081179444215828";
const ainzMemberRoleId = "525080674219196428";

const ainzRoleString = "ainz";

const host = '0.0.0.0';
const port = process.env.PORT || 3000;

app.listen(port, host, function() {
  console.log("Server started.......");
})

client.on('ready', () => {
  console.log(`Logged in as ${client.user.tag}!`);
});

client.login(process.env.TOKEN);

  client.on('guildMemberAdd', member => {
    const welcomeChannel = member.guild.channels.find(ch => ch.id === ainzWelcomeChannelId);
    // Do nothing if the channel wasn't found on this server
    if (!welcomeChannel) return;
    // Send the message, mentioning the member
    welcomeChannel.send(`Welcome, ${member}! Please mention me with your final fantasy name and FC tag in the following format "@OverlordMomonga, Kanu Lynx, AINZ" so we can set your role and FC correctly.`);
  });

  client.on('message', msg => {
    const currentChannel = msg.channel;
    let currentUser;
    
    if (msg.content.indexOf(lordMomongaId) !== -1) {
      if (msg.content.split(',').length > 1) {
        currentUser = msg.guild.members.get(msg.author.id);
        currentUser.setNickname(getNewNickname(msg, currentUser));
      } else {
        logError(currentChannel, 'cannot read message');
      }
    }
  });

  getNewNickname = (msg, currentUser) => {
    const testMessageContent = msg.content.split(',')[1];
    if (testMessageContent.length > 0) {
      const guildTag = getNewGuildTag(msg, currentUser) || '';
      return `${testMessageContent}${guildTag}`;
    } else {
      msg.guild.channels.find(ch => ch.id === ainzWelcomeChannelId);
      logError(msg.channel, 'cannot set nickname');
    }
  };

  getNewGuildTag = (msg, currentUser) => {
    const testMessageContent = msg.content.split(',');
    if (testMessageContent[2]) {
      setMemberRole(msg, testMessageContent[2].trim(), currentUser);
      return ` <${testMessageContent[2].trim()}>`;
    } else {
      channel = msg.guild.channels.find(ch => ch.id === ainzWelcomeChannelId);
      logError(msg.channel, 'cannot set FC tag.');
      return '';
    }
  }

  setMemberRole = (msg, role, currentUser) => {
    const channel = msg.guild.channels.find(ch => ch.id === ainzWelcomeChannelId);
    if (!role) {
      channel.send("Error setting role.");
      return;
    }
    role = role.toLowerCase();
    if (role.indexOf(ainzRoleString) > -1) {
      currentUser.addRole(ainzMemberRoleId);
    } else if (role.indexOf(ainzRoleString) < 0) {
      currentUser.addRole(ainzAffiliateRoleId);
    } else {
      channel.send("Error setting role.");
    }
  }

  logError = (channel, message) => {
    channel.send(`Error: ${message}`);
  }