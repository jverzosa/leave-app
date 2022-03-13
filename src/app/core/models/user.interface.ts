export interface LeaveForm {
    applicant: EmployeeNames;
    manager: EmployeeNames;
    startDate: Date;
    endDate: Date;
    returnDate: Date;
    totalDays: number;
    comments: string;
}

export interface EmployeeNames {
    name: string;
}