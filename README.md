# node_api_coding_convention

## Style Rule

- [`API Design Guide`](https://cloud.google.com/apis/design)
- [`Node.js Style Guide`](https://github.com/airbnb/javascript)

## overview
- Meaning of this repository: This is a reference point for everyone on the team to be able to work consistently
- Tech stack: Nodejs, Postgres, docker, docker-compose....
- Architecture: Based on the 3-layer architecture
- Minimum understanding to work with this repo: 
  - Have a deep understanding of nodejs
  - Familiar with the 3-layer architecture 
  - Have knowledge about postgre sql


**Start server**

- Copy `.env.sample` to be `.env` and edit the variables to fit your setup.
- Install dependency package : `npm i`
- Run the migrate DB: `npm run migrate up`
- Run the API Server: `npm run dev`

**(Optional) Start server with Docker**

- Install Docker: https://docs.docker.com/install/
- Install Docker Compose: https://docs.docker.com/compose/install/
- Copy `.env.sample` to be `.env` and edit to fit your docker configuration.
- Build docker images: `docker-compose up -d --build`

**Nothing perfect**. Before coding follow this structure code, there are some trade-offs values to maximize other values that we need to know

- Trade-offs values:
  - **Code duplication**. When we follow this architecture, the code must be duplicated many times. 
  - **Time-consuming** To initiate a new use case: it takes more time to start a new interactor, we have to think about naming, logic error, gateway methods, configuration before put them in gateways instead of call directly like we used to.
- Maximize values:
  - **Logic-focus and Logic-consistences**: we can easily adding more entrypoints to support client like SOAP, RESTFul, GraphQL ... and confident that the `core logic` would not be affected when we change the entrypoints.
  - **Decoupling**: We can easily later add or change external resources without any impact to our application logic.
  - **Screaming**: We can quickly find out which-is-doing-what by looking at the folder structure instead of reading code in many files.
   

### Project structure and code convention

## Folder structure

```bash
project
|____config/
|
|____migrations/
|
|____node_modules/
|
|____src/
|    |____controllers/
|    |    |____*/
|    |    |    |____create-*/
|    |    |    |    interactor.js
|    |    |    |    interactor.test.js  
|    |    |    |
|    |____entrypoints/
|    |    |____app/
|    |    |    |____routes/
|    |    |    |    |*.route.js 
|    |    |    |    |____*.route.test.js 
|    |    |    |____errors.js
|    |    |    |____errors.test.js
|    |    |    |____handler.js
|    |    |    |____handler.test.js
|    |    |    |____router.js      
|    |    |    |____router.test.js     
|    |    |____middlewares/
|    |    |    |____handle-*.js
|    |    |    |____handle-*.test.js    
|    |    |____schemas/
|    |    |    |____*schema.js
|    |    |    |____*schema.test.js
|    |    |____http-server.js
|    |    |____http-server.test.js
|    |    |
|    |____infrastructures/
|    |    |____data-gateway/
|    |    |    |____methods/     
|    |    |    |____providers/
|    |    |    |    |____*Primary.js
|    |    |    |    |____*Primary.test.js
|    |    |    |____data-gateway.js
|    |    |    |____data-gateway.test.js
|    |____app.js
|    |____app.test.js
|    |
|   .editorconfig
|   .env
|   .env.sample
|   .eslintignore
|   .eslintrc.js
|   .gitignore
|   .prettierrc
|   .dockerignore
|   docker-compose.yml
|   Dockerfile
|   jest.config.js
|   package.json
|   package-lock.json
|   README.md
|   swagger.yaml
```

**Folder roles**:

- `src/controller`: Where we write the core application logic.
- `src/entrypoints`: where the client call in our app: RESTful, websocket, gRPC, eventListeners ...
- `src/infrastructure` where we write the code using external resource like: database, event bus, sdk, other service ...

**Where to initiate the instances**:

- `src/app.js` is the start point of application entrypoints and start the instance which is singleton like: database connection, kafka connection, ... then can get new instances of adapters

**Convention coding**: We are follow Airbnb coding convention, please read and follow: https://github.com/airbnb/javascript

### DB Migration

**Principle**: Should always use `SQL` to run the migration as it's the native language of SQL. Currently, we use `node-pg-migrate` migration which is just support for running JS file, so, we have to write and import the sql by write scrip manually.

Generate new migration:

```bash
npm run migrate create my first migration -> it will create file xxx_my-first-migration.js
```

Then create a new sql file with the same name of migration file with suffix `__up` or `__down`.
Manual parsing the sql file in JS file. Please take the reference of file `/migrations/1598779440987-my-first-migration.js`
Document for using migration with pg: https://www.npmjs.com/package/node-pg-migrate

## Unit tests in API development

### Unit testing and why it matters

- If a new API or feature has been rolled out to the production environment, unit testing is one of several steps that must be passed during the deployment. Needless to say: `what is unit testing or its benefits`, there are a lot of articles talk about unit testing on the Internet with countless tips, style advice, and best practices information.

![alt text](https://memegenerator.net/img/instances/64979138.jpg)

### Unit testing is painful

- Yes, I’ve met many developers talk about unit testing, and some completely hate it. Not just because it can take time and hopeless to write, but also because it requires them to update their existed code to make it more testable and complex as well as slow down development speed. Furthermore, it's difficult to apply unit tests while continuously maintain someone else code.

![alt text](https://memegenerator.net/img/instances/67770835/unit-testing-aint-nobody-got-time-for-that.jpg)

### But it really helps you!

- In some instances, a feature can be hard to test if there are a lot of client-side interaction and you may think about yourself, why should I write a lot of test cases or mocking up all states of external related things to test only 20 lines of code? Let’s think about the risk of those 20 lines of code, that could make a bit of damage to an already functioning or some worked-well services on production, those tests could save you from having to debug your (or your teammate) code, then prevent you from submit a hotfix pull request or have to write an incident report to teams despite of it's a beautiful Sunday.

- Not only check the code you have written but pre-testing the existing code base to ensure the integration of your function will not fluff up other already functioning.  While there are some failure test cases in red that notify us about the problem with the code base, each passed unit tests can give us the confidence that we are going to get fewer errors.


![alt text](https://encrypted-tbn0.gstatic.com/images?q=tbn%3AANd9GcT4drB3bDqqIkLXOjSdIo_s7vmOwH5j_RXtpA&usqp=CAU)

- The only purpose of my writing is to explain why we should apply unit tests during the development, hope you (as a developer, who may hate unit tests 😆) could approach our practices easier and feel more comfortable.

### Rules to write a unit test

- In order to consistent our unit test on all services, we need a guideline for developers following during their implementation, we also apply the unit test guideline to reviewing pull request.

- We applying unit tests in the development, of course, unit tests are required when any developer submits their PR. But during the code review, there are a lot of practices that our developers used to write their unit tests, this article proposes a test pattern we should apply to implement a new feature or API, to make the code review upon unit tests following for more consistency to everyone.

`We using NodeJS to implement most APIs, so I will use Javascript for all examples and Jest to run unit tests in this article, but the concepts described could apply to other languages.`

## Build a to-do API, and unit tests

- Here I want to build unit tests for a simple APIs for my todo app: an API create new todo. Let’s start with the structure, we will need some resources below:
- 1.An HTTP server to handle client requests (entrypoints).
- 2.A database (using Postgres) to handle the todo object (infrastructure). We create a data-gateway to interact with data, using Postgres as a provider and have a method is a create-todo.
  `The create-todo method should do one thing: create a new record to the database. Here are the test cases for this method.`

```javascript
/**
 * File path: /infrastructure/data-gateway/methods/create-todo.test.js
 */
const createTodo = require("./create-todo");

let mockError;
let mockInput;
let mockTodo;
let mockPgPrimary;

beforeEach(() => {
 mockError = new Error("Oops");
 mockPgPrimary = jest.createMockFromModule('../providers/pgPrimary')
 mockPgPrimary.query = jest.fn()

 mockInput = {
   title: "Check-out at company",
   status: "undone",
 };
 mockTodo = {
   id: "0002",
   title: "Check-out at company",
   status: "undone",
   created_at: new Date(),
 };
});

describe("Testing create todo method", () => {
 test("Should throw an error if postgres is not work", () => {
   mockPgPrimary.query.mockRejectedValue(mockError);

   let actualError;
   try {
     await createTodo(mockInput);
   } catch (error) {
     actualError = error;
   }

   const expectedError = new Error("Oops");
   expect(actualError.message).toBe(expectedError.message);
   expect(actualError.code).toBe(expectedError.code);
 });
 test("Should return a todo record", async () => {
   mockPgPrimary.query.mockRejectedValue({mockTodo});

   const result = await bindFn(mockInput);

   expect(result).toEqual(expectedResult);
 });
});
```
 
`Should declare all mocking variables before declaring test cases, because you can reuse it in several test cases after.`

`Should test the exception cases first, because if any exception case is failed, there is no reason to run the next case. A function should make sure that all the exception cases we can define will be caught before it returns a result.`

`Use .toEqual() for test two objects, because it compares recursively all properties of object instances (also known as "deep" equality)`


- 3.An interactions (aka controllers) to handle create todo. The create-todo interactor receives the todo object as the input and returns a todo entity as the output.

  `This function calls data-gateway to create a todo record, and returns a todo object or throw an error. We create a draft version of this interactor before write test cases to determine it’s construction.`

```javascript
/**
 * File path: /controller/todo/create-todo/interactor.js
 */
const dataGateway = require("../../../infrastructure/data-gateway/data-gateway");

module.exports = async ({}) => {
  try {
  } catch (error) {}
};
```

```javascript
/**
 * File path: /application/interactors/create-todo/interactor.test.js
 */
const interactor = require("./interactor");

let mockError;
let mockInput;
let mockTodo;
let mockDataGateway;

beforeEach(() => {
  mockError = new Error("Oops");

  mockDataGateway = jest.createMockFromModule(
    "../../../infrastructure/data-gateway/data-gateway"
  );
  mockDataGateway.createTodo = jest.fn();

  mockInput = {
    title: "Check-out at company",
    status: "undone",
  };
  mockTodo = {
    ...mockInput,
    id: "0003",
    created_at: new Date(),
  };
});

test("Should throw an error if data gateway create todo error", async () => {
  mockDataGateway.createTodo.mockRejectedValue(mockError);

  let actualError;
  try {
    await interactor(mockInput);
  } catch (error) {
    actualError = error;
  }

  const expectedError = new Error("Oops");https://www.npmjs.com/package/node-pg-migrate: 
  expect(actualError.message).toBe(expectedError.message);
  expect(actualError.code).toBe(expectedError.code);
});

test("Should return a todo object", async () => {
  mockDataGateway.createTodo.mockResolvedValue(mockTodo);

  const result = await interactor(mockInput);

  expect(result).toEqual(mockTodo);
});
```

`
- If there are many test cases, should use beforeEach() to reset all mocking variables before each test case and declare all mocking variables with full attributes for the success case. In the case of invalid input, we can delete the mocking input object attributes to adapt the test case, it helps you unneeded to remember what attribute you have declared in the test case before, just delete or modify which you need in the current test case.

- Some naming conventions should follow to make all test files consistency:

- Mock function input should be mockInput.

- Mock function error should be mockError.
it message
￼
Target Branch
￼
￼Commit changesCancel

- Mock function object should be mockObjectname.

- The success test case should naming follow the format: Should return a <resource_result>.

- The exception test case should naming follow the format: Should throw an error if <some_reasons>.

- For the exception test cases, should use a try-catch statement, declare the actualError object, and assign it from the error in the catch statement, to avoid your test code run passthrough the catch statement. Create a new expectedError in each exception case to compare with the actual error, this variable is specified for every single case, so we should not use it as the general variable as mocking object.

- Should compare both error code and error message instead of using .toEqual() for the actual and the expected error, because only the message property of an Error is considered for equality.

These examples above have been covering the basic cases of unit testing, find more information on our Github repository. When a PR was being submitted, we just follow the rules in this article for review, to make all developers on the same page. Any contribution is welcome for improving. 
https://gitlab.com/hoangthequyen01/base_code
`

## Release Process
### What can we do to standardize the process?

### Proposed Process flow:
#### 1. Technical release flow
  ![image info](./pictures/technicalRelease.png)
- Goal 
  - provide clear changelog and release notes for all involved parties 
  - everyone should be on the same page on the release
  - create a history log of all releases
- Email Communication
  - notify all stakeholders involved and clear up misunderstandings
- Changelog template:
   - `Name of release`: Release version: vX.X.XX  

| Code name | Desciption                                                                                                                                                                                       | Example |   |   |
|-----------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|---------|---|---|
| x         | The main service version<br>Only incremented when big system changes are updated (ie. architecture, systems, etc.)                                                                               | 1.x.xx  |   |   |
| xx        | The sub-version includes the Big updates or releases<br><br><br>This version is updated when a new version to customers is released<br><br>After every release, the version is incremented by +1 | 1.1.xx  |   |   |
| xxx       | The development version, for internal releases                                                                                                                                                   | 1.0.11  |   |   |                                                                                                                                 | 1.0.11  |   |   |

##### Highlights
- List out some main highlight points	     
  - example: languages, performance, new feature, new themes, feature additions
##### Known issues
- List out known issues found in this release, where no fix has been built in yet             
##### Bug Fixes
- List of all bug fixes added in this release
- Format: “Fixed an issue where [how to reproduce bug]“   
##### Compatibility updates for deprecated features`
 `Important Upgrade Notes 
- any update about problems with new version and previous version        
##### Database changes
- List any change in System's database      
##### API changes
- Mention changes to the API
- Has to list out: Method (GET/POST/PUT/DELETE)             
- If it affects an entity, has to list out full URI
  - example: GET https://domail/api/v1/entity:id
  - Format: Method + URI + explanation of what this API call does

#### 2. Internal release flow
  ![image info](./pictures/internalRelease.png)
- Goal
  - Prepare for public release
  - Clear copywriting on all customer-facing changes
  - Multiple review stages before approvals
- Email Communication
  - Update all involved stakeholders of the API upgrade
  - Take feedback and vote
##### Teamplate API documentation Checklist
- This document serves to list out the processes and checklists when writing system Documentation. It is split into: Process, API Documentation, API Reference
  ##### Process for new API version
    ###### Post Technical Release
    These steps have to be taken after a technical release, before an internal release
      1. Write out what's new: Release Notes, Changelogs, Bug fixes
      2. Send out internal email
    ###### Internal Release 
    Before releasing a new version, we have to make sure to release it internally first, and go through a review process. This rough draft of the internal release will be created by the development team
      1. Write out API Documentation Checklist
      2. Write out API Reference Checklist
      3. Send to API Documentation review team
    ###### External Release
    Before releasing the new API version externally, the product team reviews everything against the checklists, spell checks and handles it on.
    1. Factcheck release log
    2. Copywriting and fixing of any grammatical error
    3. Go through 2 rounds of approval 
  
##### API Documentation Checklist
  ###### Release Note
- Every new release needs the following checklist completed:
  - Versioning: List the new version
  - Change log: List out all changes made in this new version
  ###### Use Cases (tutorial)
  - Simple step by step "Get started guide" to start use system. Example as how request account to using system
##### API Reference Checklist 
- When creating, updating, or deleting an API, following points have to be checked:
  - Authentication
  - Error-handling
    - API name
    - Method
    - Route
    - HTTP Status code 
    - Error message: For client side error (4xx): Must have a user-friendly message, summarizing the context, cause, and general solution for the error
    - Error type
  - API Response
- Features
  - Overview: describe what this API does and is used for
    - Description of the object
  - API example - methods
    - Headers and body structure
    - parameter
      - description: description of each parameter
      - type: type of each parameter
      - required/optional: whether this parameter is required or can be optional
      - example value
      - example call
#### 3. External Release
![image info](./pictures/externalRelease.png)
- Goal
  - completed customer facing documentation
  - peer reviewed for any technical error/wording error

 
## User Service:

- Register by email: [POST] /api/users/register
- Login: [POST] /api/users/login

```javascript
// user.schema.js
const login = {
  type: "object",
  required: ["password"],
  additionalProperties: false,
  properties: {
    email: { type: "string", format: "email" },
    phoneNumber: { type: "string" },
    password: { type: "string" },
  },
};

const registerByEmail = {
  type: "object",
  additionalProperties: false,
  required: ["name", "password", "email"],
  properties: {
    name: { type: "string", minLength: 2 },
    email: { type: "string", format: "email" },
    password: { type: "string" },
  },
};

// user.routes.js
const validator = require("../middlewares/validator");
const schema = require("../app/schemas/user.schema");
const handler = require("../app/handler");

router.post("/users/login", validator(schema.login), handler.login);
router.post(
  "/users/register_by_email",
  validator(schema.registerByEmail),
  handler.registerByEmail
);
```
