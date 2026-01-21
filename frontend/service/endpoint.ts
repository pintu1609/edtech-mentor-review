import { getSubmissions } from "@/backend/service/admin/admin"

const ENDPOINTS = {
    REGISTER: "/api/user/register",
    LOGIN: "/api/user/login/",
    GETALLMENTOR: "/api/user/getallmentor",
    GETADMINSTATS: "/api/admin/stats",
    CREATEASSIGNMENT:"/api/admin/assignment",
    GETASSIGNMENTS:"/api/admin/assignment",
    GETRECENTSUBMISSION:"/api/admin/submissions",
    GETMENTOROVERVIEW:"/api/admin/mentors",
    //STUDNT
    VIEWASSIGNEMNT:"/api/student/assignments",
    SUBMITASSIGNMENT:"/api/student/submit",
    STUDENTSUBMISSION:"/api/student/submissions",
    STUDENTSTATS:"/api/student/stats",

    // MENTOR
    GETMENTORSUBMISSION:"/api/mentor/submissions",
    GETMENTORSTATS:"/api/mentor/stats",
    REVIEWSUBMISSION:"/api/mentor/review",
   
}

export default ENDPOINTS