# Notes-app

The `notes-app` is an application that uses commands to `write`, `read`, and `delete` notes on a file called `notes.json` that will automatically create when you add your first note.

## Requirements

- [NodeJs](https://nodejs.org/en/)

## Step to run the app

- On your terminal; go to the `notes-app` directory
- Install all dependencies using: `npm install`
- Use the `node` with another command to run the `app.js` file(Check the command list below)

  `node app.js command --options`

    Example for each command:
        
    ```bash
      node app.js add --title="test" --body="testing"
      node app.js list
      node app.js read --title="test"
      node app.js remove --title="test"
    ```


## Command list

```bash
Commands:
  add     Add a new note
  remove  Remove a note
  list    List your notes
  read    Read a note

Specific options:

add command:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --title    Note title                                      [string] [required]
  --body     Note body                                       [string] [required]

remove command:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --title    Note title                                      [string] [required]

list command:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]

read command:
  --help     Show help                                                 [boolean]
  --version  Show version number                                       [boolean]
  --title    Note title                                      [string] [required]
```
