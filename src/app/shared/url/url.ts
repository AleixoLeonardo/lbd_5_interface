import { environment } from 'src/environments/environment';

export function getLoginUrl() {
    return `${environment.urlBase}/login`;
}

export function getLoadUsersUrl() {
    return `${environment.urlBase}/user/`;
}

export function getLoadUserById(id: number) {
    return `${environment.urlBase}/user/${id}`;
}

export function getSaveUserUrl() {
    return `${environment.urlBase}/user/`
}

export function getLoadJobsUrl() {
    return `${environment.urlBase}/job/`;
}

export function getSaveJobUrl() {
    return `${environment.urlBase}/job/`
}


export function getLoadTaskUrl() {
    return `${environment.urlBase}/task/`;
}

export function getLoadTaskByJObUserIdUrl(id: number) {
    return `${environment.urlBase}/task/job/${id}`;
}

export function getSaveTaskUrl() {
    return `${environment.urlBase}/task/`;
}

export function getLoadHistoryTasksUrl() {
    return `${environment.urlBase}/history_task/`;
}

export function getLoadHistoryTasksByFilterUrl(taskId: number, start: number, end: number) {
    return `${environment.urlBase}/history_task/${taskId}/inicio/${start}/fim/${end}`;
}

export function getSaveHistoryTasksUrl() {
    return `${environment.urlBase}/history_task/`;
}