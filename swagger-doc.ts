export default {
  openapi: "3.0.0",
  info: {
    title: "TDCH-AUTH-API",
    version: 1,
    description: "Auth API description for tdch-client",
  },
  servers: [
    {
      url: "https://tdch-auth-api.herokuapp.com/",
      description: "DEV Env",
    },
  ],
  tags: [
    {
      name: "Auth",
      description: "Auth endpoints for login/registration user account",
    },
  ],
  components: {
    schemas: {
      User: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "User unique id",
            example: "a7f55de1-cee6-49a3-9d07-3aa47a045c11",
          },
          email: {
            type: "string",
            description: "User email",
            example: "user@gmail.com",
          },
          weeks: {
            type: "array",
            description: "Personal User array of Week",
            $ref: "#/components/schemas/Week",
          },
        },
      },

      Week: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Week unique id",
            example: "a7f55de1-cee6-49a3-9d07-3aa47a045c11",
          },
          templateId: {
            type: "string",
            description: "Template id",
            example: "a7f55de1-cee6-49a3-9d07-3aa47a045c11",
          },
          tasks: {
            type: "array",
            description: "Week array of tasks",
            $ref: "#/components/schemas/Task",
          },
        },
      },

      Task: {
        type: "object",
        properties: {
          id: {
            type: "string",
            description: "Task unique id",
            example: "a7f55de1-cee6-49a3-9d07-3aa47a045c11",
          },
          name: {
            type: "string",
            description: "Task name",
            example: "programming",
          },
          time: {
            type: "string",
            description: "Task time (in format <hh:mm>)",
            example: "09:30",
          },
          day: {
            type: "number",
            description: "Task day (number 1-7)",
            example: "5",
          },
          status: {
            type: "number",
            description: "Task status (number 1-3)",
            example: "2",
          },
        },
      },
    },
  },
  paths: { // TODO :: add /auth/register
    "/auth/login": {
      post: {
        tags: ["Auth"],
        summary: "User login",
        description: "User login to his account",
        requestBody: {
          content: {
            "application/json": {
              properties: {
                email: {
                  type: "string",
                  description: "User email",
                  example: "user@gmail.com",
                },
                password: {
                  type: "string",
                  description: "User password",
                  example: "very-secret-password",
                },
              },
            },
          },
          required: true,
        },
        responses: { // TODO :: add correctly responses data
          "200": {
            description: "Successful operation",
            content: {
              "application/json": {
                schema: {
                  $ref: "#/components/schemas/User",
                },
              }
            },
          },
          "400": {
            description: "Invalid ID supplied",
          },
          "404": {
            description: "Pet not found",
          },
          "405": {
            description: "Validation exception",
          },
        },
        security: [
          {
            petstore_auth: ["write:pets", "read:pets"],
          },
        ],
      },
    },
  },
};
