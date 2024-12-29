# Commands

- are stored in a array as objects.
- each object has properties:

  - ```
    name: "lowercase-nospace"
    description: ""
    options: [
    {
        name: "lowercase-nospace",
        description: "",
        type: ApplicationCommandOptionType.datatype,
        required: false,
    },
    ...
    ]
    permissionRequired: []
    deleted: Boolean,
    execute(client, interaction){

    },
    ```

# Registering commands

- requires REST and Routes from discord.js

```
await rest.put(
Routes.applicationGuildCommands(CLIENT_ID, GUILD_ID),
{ body: COMMANDS_ARRAY}
)
```

# Boilerplat for commands compatible with slash command and prefix command handler

```
const { ApplicationCommandOptionType } = require("discord.js");

module.exports = {
  name: "<command_name>",
  description: "<command_description>",
  deleted: false,
  options: [
    {
      name: "<option_name>",
      description: "<option_description>",
      type: ApplicationCommandOptionType.String,
      required: false,
    },
  ],
  callback: async (client, interaction, ...args) => {
    const isPrefix = args.pop();
    const userArgs = args; // Remaining arguments from prefix handler


    // Prefix command logic
    if (isPrefix) {

      }
    }
    //Slash command logic
    else if (optionValue) {

    }

    input.reply();
  },
};
```
