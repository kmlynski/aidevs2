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

export const addProject = async (projects: Project[]): Promise<Project[]> => {
  const promises = projects.map((project) =>
    apiCall("/projects", "POST", {
      name: project.name,
    })
  );

  const addedProjects = await Promise.all(promises);

  return addedProjects.map((addedProject: any) => ({
    name: addedProject.name,
    id: addedProject.id,
  }));
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

export const deleteProject = async (projects: Project[]) => {
  const promises = projects.map((project) =>
    apiCall(`/projects/${project.id}`, "DELETE")
  );

  const deleteProjects = await Promise.all(promises);

  return deleteProjects.map((deleteProject) => ({
    id: deleteProject.id,
    name: deleteProject.name,
  }));
};
