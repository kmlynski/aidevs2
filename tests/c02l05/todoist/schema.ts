export const addProjectSchema = {
  name: "addProject",
  description: "Add project to Todoist",
  parameters: {
    type: "object",
    properties: {
      name: {
        type: "string",
        description: "Format: Name of new project",
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
