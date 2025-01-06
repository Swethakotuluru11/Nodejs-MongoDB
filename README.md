-----------------------------------------------Module1------------------------------------------>

 ->Introduction to Data and DataBases:A database is a collection of data or information designed for the input, storage, search and retrieval and modification of data.
 Databases:1.Relational & 2. Non-Relational
 ->Relational DataBases:(Tabular Format) Collection of Data  Organized into a tabular format
  .SQL
  .MYSQL
  .ORACLE
  .IBM DB2
  .POSTGRE SQL
->Non-Relational :is a type of database management system designed to handle and store large volumes of unstructured and semi-structured data. 
Uses NoSQL
TYPES:
Key-Value store, Document based(MongoDB),column based(Cassandra),Graph Database,TimeSeries

->MongoDB:
.MongoDB is an open Source NoSQL DB management System
.It stores data in JSON format
.It relies on a document model and is considered a NoSQL database, which means it differs fundamentally from conventional relational databases
<---------------------------------------------- Module2 ------------------------------------------->
1.Installation and SetUp
STEP1: Download MongoDB
The installation process installs both the MongoDB binaries as well as the default configuration file .  ------------- <install directory>\bin\mongod.cfg.----------------
STEP2: Download the Installer
Download the MongoDB Community .msi installer from the following link:https://www.mongodb.com/try/download/shell.
.In the Version dropdown, select the version of MongoDB to download.
.In the Platform dropdown, select Windows.
.In the Package dropdown, select msi. And, finally
Click Download.
STEP3: 
.Run the MongoDB installer
.Go to the directory where you downloaded the MongoDB installer (.msi file). 
.Downloads directory.
.Double-click the .msi file.
STEP4:
.Follow the MongoDB Community Edition installation Wizard, Choose setup setup type and service configuration.
<........................ Steps for MongoDB Connection and Createdocument ...............>
Connecting node to MongoDB:
1. Install Node and NPM.
2. Then create a project directory.
3. Next, initialize the node project by running this command to initialize your node project, (npm init -y). After completion of this step you will see a package JSON file in your project directory.
4. To install the driver in your project directory, run this command (npm install MongoDB). It downloads MongoDB packages and dependencies.It also saves the package in the node_modules directory and records the dependency information in the packages.json file.
5. Node and NPM installed and a new project directory with the driver dependencies installed. Now you can make connection using node application.
6.To establish a connection to the MongoDB database, use the mongoClient.connect method.
7. Once the connection is established, you can perform operations like inserting, updating, and querying data with success messages logged in the console.
8. Further, to simplify data interaction, object data modeling is used. Mongoose is an object data modeling ODM library for Node and MongoDB that simplifies data interaction by defining schemas and models for your MongoDB databases.
9. First, install Mongoose, add Mongoose to your node.JS project with (NPM install Mongoose). Next in your node application, use (const mongoose = require('mongoose')) to import the Mongoose module.
10. Connect to MongoDB use Mongoose connect to establish a connection to your MongoDB providing the connection URL, including host port, database name, and credentials.
11. Define a schema you can use (Mongoose.Schema) to define the data structure with the fields, types and validation rules.
12. Build a model with Mongoose model representing a collection in MongoDB for crud operations. With your model, interact with the MongoDB database, creating, retrieving, updating, and deleting documents through the model's methods.
   
 
 -> Authentication and Authorization:
 1. Authentication is the process of verifying the identity of a user or entity. It involves confirming that the user is who they claim to be, typically by validating their credentials, such as a user name and password.  
 2. Authorization helps with data confidentiality. It restricts access to sensitive information that prevents unauthorized users from viewing or modifying it.
 Node employs two common authorization techniques:
 1. Role-based access control (RBAC), which involves assigning different roles to users and defining access privileges based on these roles.
 2. Attribute based access control (ABAC), uses attributes or properties to make access control decisions.
 Authentication techniques:
 1. User and password authentication involves users providing their credentials.
 2. JSON Web Tokens, JWT is a popular token-based authentication mechanism. It involves the exchange of digitally signed tokens between the client and the server. These tokens contain encoded information about the user's identity and permissions. Node frameworks like Express JS provide middleware to handle JWT-based authentication.
 3. OAuth is an industry standard protocol used for delegated authentication and authorization.
 
-> Implementing authentication and authorization in node:
1. Setup project.
2. Install packages.
3. Setup Databases.
4. Define schemas.
5. Implement user registration and login functionality.
6. Store user passwords securely by applying hashing algorithms like bcrypt to protect sensitive information.
7. Create protected routes with authorization.
 
-> Sessions and cookies:
1. User sessions refer to specific periods during which a user engages with a website or application. These sessions begin when a user logs in or visits a website and conclude when they log out or close the browser. Users can also set a timeout for session cookies, ensuring user sessions expire after a specific period of inactivity.
2. Cookies are small text files that websites store on a user's device, such as a computer or mobile device, during their interaction with the site. These files contain information relevant to the user's session and are accessible to both server and client-side scripts. Cookies transmit with each user interaction, allowing the server to identify and remember the user's preferences.
<-----------------------------------Module3------------------------------->
