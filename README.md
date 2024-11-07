## Palpatine Exercise - Solution

#### Requirements

- [x] Load the super-secret-data.txt file provided. Each line is encrypted information on a single citizen
- [x] Decrypt each line using Palpatine’s Convenient Decryption API
- [x] Clean the data
    - Remove any duplicates, determined by the name field
    - You may assume there are a maximum of 200 unique citizens exist in the Galaxy. It’s a small Galaxy.
- [x] Fetch actual homeworld names from the Star Wars API (swapi) described below using the homeworld url’s on the citizen data. If the swapi is not available for some reason, then grouping by the homeworld url is fine. Your program should handle this case.
- [x] You may assume that there are a maximum of 200 homeworlds
- [x] Write the citizen names, grouped by their home worlds, to a file called citizens-super-secret-info.txt

#### Main Functionalities

1. **Read Encrypted Data**: Reads the data from a specified file.
2. **Decrypt Data**: Uses an API to decrypt the data.
3. **Format Data**: Parses and organizes data by removing duplicates.
4. **Retrieve Homeworld Names**: Resolves each citizen's homeworld by fetching details from SWAPI.
5. **Write Results**: Saves the processed data into a structured text file.

#### Technologies Used

- **Node.js : v23.1.0**
- **Fs** (for file system support)
- **Axios** (for API calls support)
- **Dotenv** (for environment variables)

#### Instalation

1. Clone this repository:

   ```bash
   git clone https://github.com/malenacaroline/mcmaa-node-app.git
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Create a file `.env` with the following variables:

   ```plaintext
    API_PALPATINE_URL: decrypt_url
    API_PALPATINE_KEY: your_secret_key
   ```

4. Start server:

   ```bash
   npm start
   ```

5. Run tests (optional):

   ```bash
   npm test
   ```

6. When the application starts running you receive the following message in your console:

   ```bash
   Starting breaking secret...
   ```
7. When the application finishes successfully you receive the following message in your console:

   ```bash
   Secret broken sucessfully! Check out the file citizens-super-secret-info.txt.
   ```
8. Then, check it out the created file `citizens-super-secret-info.txt`.

#### Comments

- In purpose of having a diverse set of data, I decided to shuffle the data and work with that.
- I parsed the SWAPI calls from `swapi.co` to `swapi.dev` to get the homeworld info from SWAPI. My application covers when SWAPI is not working. However, when tried to access swapi.co, it works but does not return proper results. And in the official site they have the following disclamer:

```plaintext
  What happened to swapi.co?
    Unfortulately swapi.co is not maintained anymore, and the service is currently down.This is a branch of SWAPI that will be supported going forward.
```

#### Challenges

- My first challenge was decrypting the file, as its large size required breaking it into smaller, manageable batches for processing. This would allow me to work with only a portion of the data at a time, making the decryption process more efficient and reducing memory load.
- Another challenge was handling the data. The data was in a specific format, and I had to parse it to extract the relevant information. This required careful attention to detail and a good understanding of the data structure.
- I needed to get the decrypted data, clean it, and obtain each selected citizen's homeworld from an another external API (SWAPI). This process required data preparation to ensure accuracy and compatibility before making requests to SWAPI. Since the batch sizes could process 1, 10, 100, or even 1,000 records at a time I had to think how implementing an efficient way to minimize any performance impact on my application, while also ensuring that the solution could handle unexpected data formats or errors.

#### Scalability and Performance
- In a scenario to handle with 1M of unique citizens and homeworlds I would have some approaches such as:
  - Continue using PromiseAll, batchings and API quotas to not overwhelming the server;  
  - Use a database to store the data such as MongoDB if the data is uncertain or likely to change, or SQL if the data needs a more consistent and relational approach;
  - Use some queue requests through Kafka to send requests at a manageable rate;
  - Implementing a caching mechanism to store the results of the API calls to SWAPI, so that the application doesn't have to make the same requests multiple times;
  - Using Clouding services to set up functions to handle a subset of requests to distribute the requests and deal better with concurrency;

  x Some of these approaches I have heard about, but I would need to explore them further to fully understand their implementation and advantages.

  #### Improvements
  - TypeScript: Have a type checking to help with security and performance to the code.
  - Add simple UI features, to input data and files and show the data in a more appelling way. I probably would use React with Chakra UI  for that.
  - Security features like authentication and authorization
  - Integration tests
  - Database 
  - Deployment

  **Thank you for the exercise, I've learned a lot! See you in the next step ;)**