export interface MonitorSummary {
  totalProjects: number;
  activeProjects: number;
  totalRevenue: number;
  pendingPayments: number;
}

export interface MonitorProject {
  id: number;
  title: string;
  status: string;
  budget: number;
  client: string;
  admaker: string;
}

export interface MonitorPayment {
  id: number;
  amount: number;
  method: string;
  status: string;
  projectTitle: string;
}

export interface ProjectPayment {
  id: number;
  amount: number;
  method: string;
  status: string;
}

export interface ProjectDetail {
  id: number;
  title: string;
  status: string;
  budget: number;
  client: string;
  admaker: string;
  payments: ProjectPayment[];
}