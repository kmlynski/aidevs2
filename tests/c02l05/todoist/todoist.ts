import { Project } from "./todoist.dt";
const apiCall = async (endpoint = "/me", method = "GET", body = {}) => {
  const response = await fetch(`https://api.todoist.com/rest/v2${endpoint}`, {
    method,
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.TODOIST_API_KEY}`,
    },
    body: method === "POST" ? JSON.stringify(body) : undefined,
  });
  return response.status === 204 ? true : await response.json();
};

export const addProject = async (name: string): Promise<Project> => {
  const addedProject: Project = await apiCall("/projects", "POST", {
    name: name,
  });

  return addedProject;
};

export const getProjects = async (): Promise<Project[]> => {
  const allProjects = await apiCall("/projects", "GET");
  return allProjects.map((project: Project) => {
    return {
      id: project.id,
      name: project.name,
    };
  });
};
