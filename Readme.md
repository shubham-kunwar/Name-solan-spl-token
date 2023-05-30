## Run Locally

- Clone the project

```bash

  git clone https://github.com/shubham-kunwar/Name-solan-spl-token.git

```

### OR

Fork the repo from [github](https://github.com/shubham-kunwar/Name-solan-spl-token)

- Navigate to the Name-solan-spl-token directory in your terminal

```bash

  cd ./Name-solan-spl-token

```

- Change Public key address and keypair.json in ./main.js

    - Upload the spl-token- image to github or ipfs.

    - Create  metadata with the image uri and upload to github or ipfs

    ```JSON

      {

        "name": "METAKUL",

        "symbol": "$KULL",

        "description": "MY COIN",

        "image": "https://raw.githubusercontent.com/shubham-kunwar/t8w_tokens/main/token.png"

      }

     ```

  - Now reopen main.js and fill Solana token name, symbol, desc in main.js

  - Add the metdatafile uri, let's say:   [https://raw.githubusercontent.com/shubham-kunwar/Name-solan-spl-token/main/Metadata.json](https://raw.githubusercontent.com/shubham-kunwar/Name-solan-spl-token/main/Metadata.json)

- Open Command Prompt and run the script

```bash

 node ./main.js

```
