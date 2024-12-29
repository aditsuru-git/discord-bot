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
