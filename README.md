# AngularTodoApp

This project was generated using [Angular CLI](https://github.com/angular/angular-cli) version 19.2.3.

## Development server

To start a local development server, run:

```bash
ng serve
```

Once the server is running, open your browser and navigate to `http://localhost:4200/`. The application will automatically reload whenever you modify any of the source files.

## Code scaffolding

Angular CLI includes powerful code scaffolding tools. To generate a new component, run:

```bash
ng generate component component-name
```

For a complete list of available schematics (such as `components`, `directives`, or `pipes`), run:

```bash
ng generate --help
```

## Building

To build the project run:

```bash
ng build
```

This will compile your project and store the build artifacts in the `dist/` directory. By default, the production build optimizes your application for performance and speed.

## Running unit tests

To execute unit tests with the [Karma](https://karma-runner.github.io) test runner, use the following command:

```bash
ng test
```

## Running end-to-end tests

For end-to-end (e2e) testing, run:

```bash
ng e2e
```

Angular CLI does not come with an end-to-end testing framework by default. You can choose one that suits your needs.

## Additional Resources

For more information on using the Angular CLI, including detailed command references, visit the [Angular CLI Overview and Command Reference](https://angular.dev/tools/cli) page.

# MyReminder

Create API Rest based on file database.json
```bash
npm run dev
```

To run the project run:
```bash
ng s
```

## Database Management

The project includes seed functionality to help manage the database:

### Seed the database with initial data
```bash
npm run seed
```

### Clear all data from the database
```bash
npm run db:clear
```

### Reset the database (clear and then seed)
```bash
npm run db:reset
```

## Remote Access with ngrok

You can access the application remotely, including backend and database access, using ngrok.

### Prerequisites
1. Install ngrok: https://ngrok.com/download or via npm:
   ```bash
   npm install -g ngrok
   ```

2. Register on ngrok website and get an authtoken:
   - Create an account at https://ngrok.com (free)
   - Get your token at https://dashboard.ngrok.com/get-started/your-authtoken
   - Configure your token locally:
     ```bash
     ngrok config add-authtoken YOUR_TOKEN
     ```

### Configuration and execution
1. Start the JSON Server (database):
   ```bash
   npm run dev
   ```

2. In another terminal, start the Angular SSR server:
   ```bash
   npm run serve:ssr:AngularTodoApp
   ```

3. In a third terminal, start ngrok pointing to the Angular server:
   ```bash
   ngrok http 4000
   ```

4. Use the URL provided by ngrok to access your application from anywhere.

#### How it works
- The Angular SSR server runs on port 4000
- The SSR server is configured with a proxy that redirects API requests to the JSON Server (port 3000)
- Ngrok creates a secure tunnel to your application, allowing external access
- All operations (listing, adding, editing, and deleting tasks) work normally through the ngrok URL
