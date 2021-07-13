# Playground

This is a folder with some mini examples outside of the applications that are built on this repository. Each file will have it unique way to run the example so make sure to read this information to get them up and running.

## Requirements

- [NodeJs](https://nodejs.org/en/)

## Examples:

### 1. Storing data with JSON and the fs module

- On your editor; get to the `playground` directory and create a new file call `2-json.js`(Make sure to use that name)
- Add the following content
    ```json
    {"name":"test","planet":"Earth","age":"30"}
    ```
- Now get to your terminal
- Use `node` to run the `1-json.js` script: `node 1-json.js`
- You will see the following outputs
    ```bash
    {"title":"Ego is the enemy","author":"Ryan Holiday"}
    Ryan Holiday
    ```
- Get back to your editor and you will see a new `1-json.json` created
- Enter to the `2-json.json` file and you will see that it content update to:
    `{"name":"testing","planet":"Earth","age":"33"}`
- Now check the code on the `1-json.js` file and have some fun with it
