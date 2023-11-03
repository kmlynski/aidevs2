export const addProjectSchema = {
  name: "addProject",
  description: "Add project to Todoist",
  parameters: {
    type: "object",
    properties: {
      projects: {
        type: "array",
        description: "list of project that needs to be added",
        items: {
          type: "object",
          properties: {
            name: {
              type: "string",
              description: "Format: Name of new project",
            },
          },
        },
      },
    },
  },
};

export const getProjectsSchema = {
  name: "getProjects",
  description: "Get projects from Todoist",
  parameters: {
    type: "object",
    properties: {},
  },
};

export const deleteProjectSchema = {
  name: "deleteProject",
  description: "Delete projects from Todoist",
  parameters: {
    type: "object",
    properties: {
      projects: {
        type: "array",
        description: "list of projects that needs to be deleted",
        items: {
          type: "object",
          properties: {
            id: {
              type: "number",
              description: "ID of the project to delete",
            },
          },
        },
      },
    },
  },
};
